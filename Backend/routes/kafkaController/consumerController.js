var Kafka = require('no-kafka');
const express = require('express');
var router = express.Router();
//var lisD = require('../../models/device');
var sensors = require('../../models/sensors');
var GlobalSensor = require('../../models/globalSensor')
const http = require('http').createServer(express);
const io = require('socket.io')(http);
var Device = require('../../models/capteur');
var Device = require('../../models/capteur');
var Place = require('../../models/placeParking');
var PlaceTest = require('../../models/placeTest.js');
let kafka = require("kafka-node");
var listSensors = new sensors();
var capteur = new Device();
const { spawn } = require('child_process');



http.listen(5001, () => {
    console.log("Listening to port 3006");
    //addFrame();

});

io.on('connection', (socket) => {
    console.log("Client Connected");

})
//new kafka
try {
    msg = [];
    Sensor = [];
    var consumer = new Kafka.SimpleConsumer({
        connectionString: 'kafka.treetronix.com:9095',
       // connectionString: 'kafka.treetronix.com:9095',

        clientId: 'no-kafka-client'

    });
    /*var dataHandler = function (messageSet, topic, partition) {
        
        messageSet.forEach(function (m) {
          // console.log(m.message.value.toString('utf8'));
            const obj = JSON.parse(m.message.value.toString('utf8'));
            addFrame(m.message.value.toString('utf8'));
            //console.log(obj) ;
            return io.emit('message', {y: m.message.value.toString('utf8')});
        });
       
    };*/
    const dataHandler = function (messageSet, topic, partition) {
        messageSet.forEach(function (m) {
            /*console.log(
              topic,
              partition,
              m.offset,
              m.message.value.toString('utf8')
            );*/
            const obj = JSON.parse(m.message.value);
            // console.log(obj);

            checkSensor(obj);
        });
    };
    consumer.init().then(function () {
        // Subscribe partitons 0 and 1 in a topic:
        var v1 = consumer.subscribe('AS.Treetronix.v1', dataHandler);
        var arr = [];
        arr.push([v1]);
        //console.log("val:" ,arr);
        console.log(`val:${arr}`);
        return arr;
    });

    Device.find(async function (err, foundObject) {
        // console.log(`All sensors kept from kafka server: ${foundObject}`);
    });
}
catch (e) {
    console.log("Error : ", e)
}

async function checkSensor(obj) {
    console.log("Données Reçues de Kafka: ", obj)
    try {
        const dev = await Device.findOne({ code: obj.DevEUI_uplink.DevEUI });
        //console.log("Dev Check Sensor " , dev)
        if (dev === null) {
            console.log('Unkown device !');
        }
        else {
            //console.log("DevEUI :", obj.DevEUI_uplink.DevEUI);
            //console.log("Payload_hex",obj.DevEUI_uplink.payload_hex);
            SensorCrypt(obj.DevEUI_uplink.payload_hex, obj.DevEUI_uplink.DevEUI);
        }

    } catch (e) {
        console.log(e);
    }
}


async function decryptData(payload) {
    console.log("Payload : ", payload)
    console.log("Payload length: ", payload.length)
    var byte1 = payload[2] + payload[3];
    console.log('Byte numéro 1 en hexa:', byte1);
    var b = (parseInt(byte1, 16).toString(2)).padStart(8, '0').toString(); // conversion du byte 1 de l'hexadecimal en binaire 
    console.log("Byte numéro 1 en binaire  :", b)
    var typeF = b[0] + b[1] + b[2] + b[3]  /// les bits consacrés au type de trame
    console.log("Bits du frame type ", typeF)
    if (typeF === '1000') {
        console.log("Type de trame : Heartbeat Frame")
    }
    else if (typeF === '1010') {
        console.log("Type de trame : Status Change Frame")
    }
    if (payload.length === 28 && (typeF === '1000' || typeF === '1010')) {
        var byte10 = payload[20] + payload[21];
        console.log('Byte numéro 10 en hexa:', byte10);
        var k = (parseInt(byte10, 16).toString(2)).padStart(8, '0').toString(); // conversion du byte 10 de l'hexadecimal en binaire 
        console.log("Byte numéro 10 en binaire  :", k)
        var status = parseInt(k[0])
        //console.log("Status du parking est", status)
        if (status == 1) {
            console.log("Le status du parking est:", status, " ==> voiture existe")
        }
        else {
            console.log("Le status du parking est:", status, " ==>  voiture n'existe pas")
        }
        var m = k[1] + k[2] + k[3] + k[4] + k[5] + k[6] + k[7] /// les bits consacrés au niveau de batterie
        //console.log('Bits du niveau de batterie', m)
        var batterie = parseInt(m, 2) / 10.0                       //////////// convertir du binaire au décimal pour trouver la valeur du niveau de batterie
        console.log(" ==> La valeur de niveau de batterie est :", batterie);
        /*const data = 
        {
          "status":status,
          "battery": batterie
      }  
      data1=JSON.stringify(data)
      data2=JSON.parse(data1)
      console.log("Data2 :" ,data2)*/
        var data = {
            "status": status,
            "battery": batterie
        }
        console.log("Decrypted data:", data)
        return data
    }
    //return data2;
}
async function SensorCrypt(Crypteddata, DevEUI) {
    console.log('Crypted Data :  ', Crypteddata);
    //console.log('DevEUI', DevEUI);
    if (DevEUI === 'FFFFFF1000016337' || DevEUI === 'FFFFFF100001BE99') {
        let dataToSend = null;
        dataToSend = decryptData(Crypteddata);
        let c = new Promise((resolve, reject) => {
            console.log('here');
            resolve(dataToSend);
        });
        let val = await c;
        console.log(val);
        let json = JSON.stringify(val)
        let parsedJson = JSON.parse(json)
        console.log("JSON: ", parsedJson)
        const datatram = parsedJson;
        console.log("Datatram: ", datatram)
        Updatedata(datatram, DevEUI);
    }
}


// Mettre à jour les données reçues
async function Updatedata(data, code) {
    console.log("Data :", data, "Code :", code)
    Sensor = await Device.findOne({ code: code });
    placeTest = await PlaceTest.findOne({ code: code });

    delete data.code;
    delete data.data;
    //Sensor.data.update(data)
    /** */
    // Sensor.data.push(data);
    // await Sensor.save();
    // placeTest.Capteur.push(data)
    // await placeTest.save();
    /* */
    /*var Sensor ={
        code:code,
        data:data
    }
    Device.findByIdAndUpdate(Device.id, { $set: Sensor }, { new: true }, (err, doc) => {
        if (!err) { console.log("Updated") } else { console.log('Error in sensor Update :' + JSON.stringify(err, undefined, 2)); }
    });*/
    //Device.findOneAndUpdate({data:data})
}


// Sauvegarder les données reçues   
router.post('/AddingSensor', async (req, res) => {
    try {
        sensor = await Device.findOne({ code: req.body.code });
        delete req.body.code;
        console.log("Sensor ", sensor)
        console.log("Device EUI :", Deveui)
        sensor.data.push(req.body)
        await sensor.save();

        return res.status(200).json({ status: 'ok', message: 'added' });
    } catch (e) {
        console.log('Error Adding Sensor Data', e);
    }
});
/// Ajouter Capteur
router.post('/addingCapteur', function (req, res) {
    const capteur = new Device({
        code: req.body.code,
        type: req.body.type,

    });
    try {
        Place.findOne({ code: req.body.code }, async function (err, foundObject) {
            if (foundObject) {
                res.json({ status: 'err', message: 'Device already Added' });
            }
            else {
                capteur.save()
                    .then(item => {
                        res.send('Item saved in database successfully');
                    })
                    .catch(err => {
                        res.status(400).send('Unable to save in database');
                    });
            }
        });
    }
    catch (e) {
        console.log('Error when adding Capteur', e)
    }

});
//Détails d'un capteur par code
router.post('/capteurParCode', function (req, res) {

    Device.find({ "code": req.body.code })
        .populate('capteur')
        .exec(function (err, listCapteurs) {
            if (err) {
                console.log("err");
            } else {
                console.log(listCapteurs)
                res.json(listCapteurs);
            }
        });

})
///
router.get('/capteurParCode/:code', function (req, res) {
    let code = req.params.code;

    Device.find({ code })
        .populate('capteur')
        .exec(function (err, listCapteurs) {
            if (err) {
                console.log("err");
            } else {
                console.log(listCapteurs)
                res.json(listCapteurs);
            }
        });

})
/// Afficher les données d'un capteur à partir du DevEUI d"une place
router.post('/codeCapteur', function (req, res) {
    try {

        Device.find({ code: req.body.code }, function (err, listCapt) {
            if (err) {
                console.log("Error :", err);
            } else {

                res.json(listCapt.data);
                console.log(listCapt)
            }
        });




    } catch (err) {
        res.json({ message: err.message });

    }


})




router.post('/addPlaceTesting', function (req, res) {
    try {
        let codeC = capteur.code

        Device.findOne({ code: req.body.code }, async function (err, foundObject) {
            if (err) {
                res.json({ status: 'err', message: 'Error' });
            } else if (!foundObject) {
                res.json({ status: 'err', message: 'Capteur not found' });
            }

        }).then(item => {
            if (item == null) {
                res.json({ status: 'err', message: 'Object already added' });
            }
            else {
                //let codeC=capteur.code
                PlaceTest.findOne({ code: item.code }, async function (err, ObjectFoundinPlace) {
                    if (err) {
                        res.json({ status: 'err', message: 'Object not found' });
                    }
                    else if (ObjectFoundinPlace == null) {
                        const placeTest = new PlaceTest({
                            name: req.body.place,
                            attributed: false,
                            reserved: false,
                            park: req.body.park,
                            adminId: req.body.adminId,
                            code: req.body.code,
                            Capteur: [{
                                status: 0,
                                battery: ''
                            }],
                            lng: req.body.lng,
                            lat: req.body.lat
                        });
                        
                        placeTest.save();
                        if (err) {
                            res.json({ status: 'err', message: 'Error in saving place' });
                        } else {
                            res.json({ status: 'success', message: 'Object added Successfully ' });
                        }
                    }

                });
            }

        });

    }
    catch (e) {
        console.log("Error :", err)
    }

});
///////Add place 
router.post('/addPlaceTest', async function (req, res) {
    try {
        let codeC = capteur.code

        const placeTest = await PlaceTest.create({
            name: req.body.place,
            attributed: false,
            reserved: false,
            park: req.body.park,
            adminId: req.body.adminId,
            Capteur: [

            ],
            lng: req.body.lng,
            lat: req.body.lat
        });
        PlaceTest.findOne({ codeC: req.body.capteur.code }, async function (
            err,
            foundObject
        ) {
            if (foundObject) {
                res.json({ status: 'err', message: 'Capteur already exists' });
            } else {
                placeTest
                    .save()
                    .then(item => {
                        res.json({ status: 'success', mesage: 'Place saved to database successfully' });
                    })
                    .catch(err => {
                        res.status(400).send('Unable to save to database');
                    });
            }
        });

    } catch (e) {
        console.log('Error place Data', e);
    }
});
/*
const client = new kafka.KafkaClient({ kafkaHost: '193.95.76.211:9092' });
msg = [];
console.log("Initialised..");
const topics = [{
    topic: 'AS.Treetronix.v1',
    offset: 0, //default 0
    partition: 0 // default 0
}];


const options = {
    autoCommit: true
};

const consumer = new kafka.Consumer(client, topics, options);

consumer.setMaxListeners(11);

consumer.on("ready", function(message) {
    console.log("I am ready");
});


//console.log('rrrrrrrrrrrrr', msg);
consumer.on("error", function(err) {
    console.log("error", err);
});

consumer.on("message", function(message) {
  //  console.log("Hey got message");
    //console.log(JSON.parse(message.value));
    vv(message);

});
*/
///////////////////////////////////////

/*async function addFrame(x) {
    try {
    //console.log("X :" ,x)
    var y = JSON.parse(x); // DevEui uplink
    console.log("DevEUI Uplink : ",y)
    var devEUI =y.DevEUI_uplink.DevEUI
    if (devEUI === 'FFFFFF1000016337' || devEUI === 'FFFFFF100001BE99'){
    msg.push(y);
    listSensors = msg;
    sensors.create(listSensors[(listSensors.length - 1)], function(err, temps) {  //// listSensors représente la liste des capteurs
        if (err) {
            console.log("Erreur :",err);
        }
    })
    decryptFrame(listSensors[(listSensors.length - 1)])
    var dec= decryptFrame(listSensors[(listSensors.length - 1)])
    console.log("x décrypté ",dec)
    }}
     catch(err)
    {
        console.log("Erreur " ,err)
    }
}*/
/*async function addFrame(x) {
  try {
  //console.log("X :" ,x)
  var y = JSON.parse(x); // DevEui uplink
  console.log("DevEUI Uplink : ",y)
  var devEUI =y.DevEUI_uplink.DevEUI
  if (devEUI === 'FFFFFF1000016337' || devEUI === 'FFFFFF100001BE99'){
  msg.push(y);
  caapteur = msg;
  Device.create(capteur[(capteur.length - 1)], function(err, temps) { 
      if (err) {
          console.log("Erreur :",err);
          
      }
  });
  decryptFrame(capteur[(capteur.length - 1)])
  var dec= decryptFrame(capteur[(capteur.length - 1)])
  console.log("x décrypté ",dec)
  }}
   catch(err)
  {
      console.log("Erreur " ,err)
  }
}*/


// Décrypter les données reçues à partir de kafka
/*async function decryptFrame(x) {
    //console.log("DevEUI :" ,x)
    var payload=x.DevEUI_uplink.payload_hex
    console.log("Payload : " ,x.DevEUI_uplink.payload_hex)
    var DevEUI =x.DevEUI_uplink.DevEUI
    //if (x.length != 10) {
        if (payload.length === 28 ){
            console.log("La trame reçue est :" , x.DevEUI_uplink.payload_hex)
            console.log("Payload length: " , payload.length)
            console.log("DevEUI : " , DevEUI)

        var byte1 = x.DevEUI_uplink.payload_hex[2] + x.DevEUI_uplink.payload_hex[3];
        console.log('Byte numéro 1 en hexa:', byte1);
        var b = (parseInt(byte1, 16).toString(2)).padStart(8, '0').toString(); // conversion du byte 1 de l'hexadecimal en binaire 
        console.log("Byte numéro 1 en binaire  :" ,b)
        
        var  typeF= b[0] + b[1] + b[2] + b[3]  /// les bits consacrés au type de trame
        console.log("Frame type ",typeF)
        if(typeF === '1000'){
            console.log("Type de trame : Heartbeat Frame")
        }
        else if(typeF === '1010') {
            console.log("Type de trame : Status Change Frame")
        }
        var y = x.DevEUI_uplink.payload_hex[20] + x.DevEUI_uplink.payload_hex[21];
        console.log('Byte numéro 10 en hexa:', y);
        var k = (parseInt(y, 16).toString(2)).padStart(8, '0').toString(); // conversion du byte 10 de l'hexadecimal en binaire 
        console.log("Byte numéro 10 en binaire  :" ,k)
        var status=k[0]
        console.log("Status du parking est", status)
        if(k[0]=='1'){ 
            console.log("Bit numéro 7 est :" ,k[0]," ==> voiture existe")
        }
        else {
            console.log("Bit numéro 7 est :" ,k[0]," ==>  voiture n'existe pas")
        }
       
        var m = k[1] + k[2] + k[3] + k[4] + k[5] + k[6] + k[7] /// les bits consacrés au niveau de batterie
        console.log('Bits du niveau de batterie', m)
        var z=parseInt(m,2) /10.0                       //////////// convertir du binaire au décimal pour trouver la valeur du niveau de batterie
        console.log(" ==> La valeur de niveau de batterie est :" , z);
        
        /*if (k[0] == '1') {
            var battery = parseInt(m, 2) / 10.0;
            ///console.log('Le niveau de batterie est : ', battery)
            io.emit('vv', Array.from({ length: 1 }, () => [x.DevEUI_uplink.DevEUI, x.DevEUI_uplink.Time, 'true', battery]));
            setTimeout(() => {}, 2000)
        } else {
            var battery = parseInt(m, 2) / 10.0;
            //console.log('Le niveau de batterie est : ', battery)
            io.emit('vv', Array.from({ length: 1 }, () => [x.DevEUI_uplink.DevEUI, x.DevEUI_uplink.Time, 'false',battery]));
            setTimeout(() => {}, 2000)
        }
        return "DevEUI : " + DevEUI + " status : " + status + " battery : " + z;
    }}
   


}*/
// router.route('/:devices').get(function(req, res) {
//     let devices = req.params.matricule;
//     lis.find({ devices }, function(err, listRes) {
//         if (err) {
//             console.log("err");
//         } else {
//             res.json(listRes);
//         }
//     });
// });


module.exports = router;