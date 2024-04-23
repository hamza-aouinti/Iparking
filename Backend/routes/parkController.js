var express = require('express');
var router = express.Router();
var lisP = require('../models/parking');
const multer = require('multer');
var user = require('../models/superAdmin');
var Reservation=require('../models/reservation')
var SimpleUser = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
//var Place= require('../models/place');
var Price=require('../models/price');
var PriceDay=require('../models/priceDay');
var PriceWeek=require('../models/priceWeek');
const e = require('express');
const Place = require('../models/placeTest');
const PlaceParking = require('../models/placeParking');

const Capteur=require('../models/capteur');
const Compte=require('../models/compte')
const Message=require('../models/message')
const Test=require('../models/test')
const GlobalSensor=require('../models/globalSensor')
const nodemailer = require('nodemailer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `FunOfHeuristic_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var today = new Date();
var timeNow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();    
console.log("Temps : " ,timeNow)


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
////////Liste de parking par admin/////////
router.get('/list/listParkingwithId',function(req,res){

    console.log("userIdTofindParking: "+req.body.userId);
    lisP.find({"userId":req.body.userId})
    .populate('lisP')
    .exec(function (err, ParkList) {
        if (err) {
            console.log("err");
        } else {
            console.log(ParkList)
            res.json(ParkList);
        }
    });
    
})
////////Liste de parking par admin/////////
router.post('/list/listParkingwithId',function(req,res){

    console.log("userIdTofindParking: "+req.body.userId);
    lisP.find({"userId":req.body.userId})
    .populate('reservation')
    .exec(function (err, listRes) {
        if (err) {
            console.log("err");
        } else {
            console.log(listRes)
            res.json(listRes);
        }
    });
    
})
//////// 
router.post('/parking',function(req,res){

    lisP.find({"longitude":req.body.longitude , "latitude":req.body.latitude})
    .populate('parking')
    .exec(function (err, Park) {
        if (err) {
            console.log(err);
        } else {
            console.log(Park)
            res.json(Park);
        }
    });
    
})
///////
router.post('/getParkingByName',function(req,res){

    lisP.find({ "name": req.body.name })
    .populate('parking')
    .exec(function (err, listRes) {
        if (err) {
            console.log("err:", err.message);
        } else {
            console.log(listRes)
            res.json(listRes);
        }
    });
    
})




router.post("/list/update",function(req, res) {
  Place.updateOne({ park: "Nasr4" , name:"P42" }, { reserved: true }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.post('/alert/mailing' , function(req,res){
    console.log('---------------------chaima-lolo-ajaja------------*******************************' , req.body.to)
    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,// true for 465, false for other ports
        service : "gmail",
        auth : {
            user: "treetronix.alerte@gmail.com",
            pass: "pcvslsvkykymxlos"

        }
    })
    
    let details = {
        from: 'treetronix.alerte@gmail.com', // sender address
        to : req.body.to,
        subject : 'Alert '+req.body.list.name+ ' ' + req.body.list.park,
        text : "il y a une voiture dans une place non reservée"
		
    }

    mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log(err)
        }
    })
})

///////////
router.post('/list/ParkWithName',function(req,res){
    try {

        Place.find({park:req.body.name,reserved:false},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})

////// Prix par heure du park
router.post('/prixPark',function(req,res){
    try {

        Price.find({park:req.body.name},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
////// Prix par jour du park
router.post('/prixDayPark',function(req,res){
    try {

        PriceDay.find({park:req.body.name},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
////// Prix par semaine du park
router.post('/prixWeekPark',function(req,res){
    try {

        PriceWeek.find({park:req.body.name},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
////// Trouver liste des places par nom de park ////////
router.post('/list/ParkWithNameMap',function(req,res){
    try {

        Place.find({park:req.body.name},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
////// Trouver liste des reservations par nom de park ////////
router.post('/list/ReservedPlaceWithName',function(req,res){
    try {

        Reservation.find({park:req.body.name} ,function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        


    } catch (err) {
        res.json({message: err.message});

    }

    
})


router.post('/list/deletePlace',function(req,res){
    try {
console.log("Data to be deleted: "+req.body.place)
	
   let result=  place.deleteOne({ name: req.body.place,rang:req.body.rang }).then(function(){ 
    console.log("Data deleted"); // Success 
}).catch(function(error){ 
    console.log(error); // Failure 
}); ;

console.log("delete place?")
res.json(result)
    } catch (err) {
        res.json({message: err.message});

    }

    
})




router.post('/list/curentUser',function(req,res){

 
    try {

        user.find({email:req.body.email},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/curentSimpleUser',function(req,res){

 
    try {

        SimpleUser.find({ email:req.body.email},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
 })


router.get('/list/parking', function (req, res) {

    lisP.find({"userId":req.body.userId})
        .populate('reservation')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                res.json(listRes);
            }
        });
});
router.route('/list/parking/:name').get(function (req, res) {
    let name = req.params.name;

    lisP.find({ name }, function (err, listRes) {
        if (err) {
            console.log("err");
        } else {
            res.json(listRes);
        }
    });
});

router.post('/addPlace', (req, res) => {
    console.log(req)

})

// Ajouter un Parking
router.post('/addParking',(req, res) => {
    var parking = new lisP();
    parking.name = req.body.name;
    parking.longitude = req.body.longitude;
    parking.latitude = req.body.latitude;
    parking.des=req.body.des;
    parking.price = req.body.price;
    parking.priceD=req.body.priceD;
    parking.priceW=req.body.priceW,
    parking.description=req.body.description;
    parking.nbplace = req.body.nbplace;
    parking.capteur = req.body.capteur;
    parking.image = req.body.image;
    parking.userId = req.body.userId;
    console.log(parking.userId)
    parking.save((err, registeredUser) => {
        if (err) {
            console.log('Error in parking save :' +JSON.stringify(err,undefined,2));
        } else {

            res.send(registeredUser)
        }
    })
})

//Supprimer un parking
router.delete('/list/p/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lisP.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in park Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
//Supprimer une place
router.delete('/deletePlace/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Place.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in place Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Mettre � jour un park
router.put('/list/m/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        des:req.body.des,
        price: req.body.price,
        priceD:req.body.priceD,
        priceW:req.body.priceW,
        description:req.body.description,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findByIdAndUpdate(req.params.id, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Park Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
////////// Mettre � jour une place ////////////////
router.put('/updatePlace/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var place = {
        name:req.body.name,
        attributed:req.body.attributed,
        reserved:req.body.reserved,
        park:req.body.park,
        rang:req.body.rang,
        lng:req.body.lng,
        lat:req.body.lat,
        adminId:req.body.adminId,

           };
    Place.findByIdAndUpdate(req.params.id, { $set: place}, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in place Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

/// Liste des parkings
router.post('/list/AllParking',function(req,res){
    try {

        lisP.find({},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})

// Liste de tous les parkings (Pour partie user)
router.post('/list/AllParks',function(req,res){
    try {

        lisP.find({},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.put('/list/m/:name', (req, res) => {


    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        price: req.body.price,
        priceD:req.body.priceD,
        priceW:req.body.priceW,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findOneAndUpdate({ "name": req.params.name }, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Park Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

/// Add Place
router.post('/addPlace',function(req, res) {
    console.log('1')
    let place= new Place({
        name:req.body.place,
        attributed:false,
        reserved:false,
        park:req.body.park,
        adminId:req.body.adminId,
        code:req.body.code,
        lng:req.body.lng,
        lat:req.body.lat
  
    })
  console.log("place: "+place)
    place=place.save()
    res.json(place)
    });

//Ajouter une place
router.post('/AjouterPlace', function(req,res){
    console.log('2')
    try {
     {
                    const placePark= new PlaceParking({
                        name:req.body.place,
                        attributed:false,
                        reserved:false,
                        park:req.body.park,
                        adminId:req.body.adminId,
                        code:req.body.code,
                        Capteur:[{
                            status:0,
                            battery:''
                        }],
                        lng:req.body.lng,
                        lat:req.body.lat
                    });
                placePark.save();
                res.json({ status: 'success', message: 'Object added Successfully ' });
                } 
               
            
        
        
       

}
    catch(e){
        console.log("Error :" ,err)}
        
    });
    router.post('/addingPlace', function(req,res){
        console.log('3')
    try {
    Capteur.findOne({ code:req.body.code},async function( err, foundObject) {
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
            Place.findOne({code:item.code}, async function(err,ObjectFoundinPlace){
                if (err) {
                    res.json({ status: 'err', message: 'Object not found' });
                } 
                else if(ObjectFoundinPlace == null) {
                    const placePark= new Place({
                        name:req.body.place,
                        attributed:false,
                        reserved:false,
                        park:req.body.park,
                        adminId:req.body.adminId,
                        code:req.body.code,
                        lng:req.body.lng,
                        lat:req.body.lat
                    });
                placePark.save();
                res.json({ status: 'success', message: 'Object added Successfully ' });
                } 
               
            });
        }
        
        });

}
    catch(e){
        console.log("Error :" ,err)}
        
    });
///////////Liste des places par admin
router.post('/list/listPlacewithId',function(req,res){

    console.log("adminIdTofindPlace: "+req.body.userId);
    Place.find({"adminId":req.body.userId})
    .populate('place')
    .exec(function (err, listPlace) {
        if (err) {
            console.log("err");
        } else {
            console.log(listPlace)
            res.json(listPlace);
        }
    });
    
})
///////////Liste des capteurs 
router.get('/listCapteurs',function(req,res){

    Capteur.find({})
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
/// Liste de toutes les places
router.get('/AllPlaces',function(req,res){
    try{
        Place.find({},function(err,Place){
            if(err){
                console.log("err");
            }
            else{
                res.json(Place)
            }
        });
    }
    catch(err){
        res.jsonn({message:err.message});
    }
})
/// Ajouter un global sensor
router.post('/addSensor',function(req,res){
    const globalSensor=new GlobalSensor({
        DevEUI:req.body.DevEUI,
        type:req.body.type
    });
    try {
        Place.findOne({DevEUI:req.body.DevEUI}, async function (err, foundObject){
            if(foundObject){
                res.json({status:'err', message:'Device already Added'});
            }
            else 
            {
                globalSensor.save()
                .then(item => {
                    res.send('Item saved in database successfully');
                })
                .catch(err => {
                    res.status(400).send('Unable to save in database');
                });
            }
        });
    }
    catch(e){
        console.log('Error when adding globalSensor',e)
    }
})
/// Ajouter Capteur
router.post('/addCapteur',function(req,res){
    const capteur=new Capteur({
        name:req.body.name,
        rang:req.body.rang
    });
    try {
        Place.findOne({rang:req.body.rang}, async function (err, foundObject){
            if(foundObject){
                res.json({status:'err', message:'Device alredy Added'});
            }
            else 
            {
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
    catch(e){
        console.log('Error when adding Capteur',e)
    }
})
// Cr�er un compte de payement
router.post('/addCompte',function(req, res) {
    let compte= new Compte({
        userId:req.body.userId,
        //add:req.body.add,
        numCard:req.body.numCard,
        code:req.body.code,
        montant:req.body.montant,

    })
  console.log("Compte: " +compte)
   
      compte=compte.save( (err, doc) => {
    if (!err){
    res.json(compte)
    }
    else { 
    res.json({ status: 'err', message: 'Error' });
      console.log('Error in Creating Account :' + JSON.stringify(err, undefined, 2));

    }

  });
    });

////// Mettre � jour un compte : Ajout d'argent au compte///////////
router.put('/updateCompte/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var compte = {
        add:req.body.add,
        numCard:req.body.numCard,
        code:req.body.code,
        montant:parseFloat(req.body.montant) + parseFloat(req.body.add),
        //montant:req.body.montant
    };
    Compte.findByIdAndUpdate(req.params.id, { $set: compte }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } 
        else { console.log('Error in Account Update :' + JSON.stringify(err, undefined, 2));
        console.log('Error in Account Update :' + err); }
    });
});
/////////// D�tails Compte par user ///////////////
router.post('/compteWithId',function(req,res){
    try {
        console.log("userId" ,req.body.userId)
            Compte.find({"userId":req.body.userId})
            .populate('compte')
            .exec(function (err, compteUser) {
                if (err) {
                    console.log("err");
                } else {
                    console.log(compteUser)
                    res.json(compteUser);
                }
            });
            
    
         
        } catch (err) {
            res.json({message: err.message});
    
        }
    
    
})
//Liste des comptes
router.post('/compte',function(req,res){
    try {
    console.log("userId"+req.body.userId)
        Compte.find()
        .populate('compte')
        .exec(function (err, compte) {
            if (err) {
                console.log("err");
            } else {
                console.log(compte)
                res.json(compte);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
async function calcul(date1,date2){
    try {
        const date1=Reservation.dateDebut;
        const date2=Reservation.dateFin;
        const nbJrs=parseInt((date2 - date1)/(1000 * 60 * 60 * 24 ))
        console.log("Nombre de jours : " +nbJrs)    
    }
    catch(err)
    {
        res.json({message:err})
    }
}
////// Mettre � jour un compte : payer reservation///////////
router.put('/payReservation/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  var compte = {
      add:req.body.add,
      montant:parseInt(req.body.montant) - req.body.add,
     
  };
  Compte.findByIdAndUpdate(req.params.id, { $set: compte }, { new: true }, (err, doc) => {
      if (!err) {res.send(doc); } 
      else { console.log('Error in Account Update :' + JSON.stringify(err, undefined, 2));
      console.log('Error in Account Update :' + err); }
  });
});
//////////// Make Reservation //////////
router.post('/list/MakeReservation',function(req,res){
    try {
      console.log("userId from reservation: "+req.body.data.userId)
      console.log("reservation park: "+req.body.data.park)
      let reservation = new Reservation({
        park:req.body.data.park,
        palce: req.body.data.place,
        matricule:req.body.data.matricule,
        dateDebut: req.body.data.dateD,
        dateFin:req.body.data.dateF,
        timeDebut:req.body.data.timeD,
        timeFin:req.body.data.timeF,
        priceH:req.body.data.priceH,
        priceD:req.body.data.priceD,
        priceW:req.body.data.priceW,
        //totalPrice:(parseFloat(req.body.data.timeF) - parseFloat(req.body.data.timeD))* parseFloat(req.body.data.priceH),
        totalPrice:parseFloat(req.body.data.priceH) * ( ((parseInt(req.body.data.dateF) - parseInt(req.body.data.dateD))*24) + Math.abs(parseFloat(parseFloat(req.body.data.timeF) - parseFloat(req.body.data.timeD)) )),
        userId:req.body.data.userId,
        adminId:req.body.data.adminId,
        
    })
    
    console.log("Reservation details: " +reservation);
    reservation =  reservation.save();
    Place.updateOne({ park:req.body.data.park , name: req.body.data.place }, { reserved: true }, function(
        err,
        result
      ) {
        if (err) {
            console.log("error updating")
          res.send(err);
        } else {
            console.log("success updating")

          res.json(result);
        }
      });
      
   
}
        catch (err) {
            res.json({message: err.message});
        }
    })

// Ajouter Reservation 
router.post('/list/makeReservation',function(req,res){
    try {
      console.log("userId from reservation: "+req.body.data.userId)
      console.log("reservation park: "+req.body.data.park)
      let reservation = new Reservation({
        park:req.body.data.park,
        palce: req.body.data.place,
        matricule:req.body.data.matricule,
        dateDebut: req.body.data.dateD,
        dateFin:req.body.data.dateF,
        timeDebut:req.body.data.timeD,
        timeFin:req.body.data.timeF,
        priceH:req.body.data.priceH,
        priceD:req.body.data.priceD,
        priceW:req.body.data.priceW,
        //totalPrice:(parseFloat(req.body.data.timeF) - parseFloat(req.body.data.timeD))* parseFloat(req.body.data.priceH),
        totalPrice:parseFloat(req.body.data.priceH) * ( ((parseInt(req.body.data.dateF) - parseInt(req.body.data.dateD))*24) + Math.abs(parseFloat(parseFloat(req.body.data.timeF) - parseFloat(req.body.data.timeD)) )),
        userId:req.body.data.userId,
        adminId:req.body.data.adminId,
        
    })
    
    console.log("Reservation details: " +reservation);
    reservation =  reservation.save();
    Place.updateOne({ park:req.body.data.park , name: req.body.data.place }, { reserved: true }, function(
        err,
        result
      ) {
        if (err) {
            console.log("error updating")
          res.send(err);
        } else {
            console.log("success updating")

          res.json(result);
        }
      });
      
      
}
        catch (err) {
            res.json({message: err.message});
        }
    })
    
// Supprimer Reservation Admin
router.delete('/delete/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    Reservation.findByIdAndRemove(req.params.id, (err,doc) =>{
        if (!err) { 

            Place.updateOne({ reserved:false}, function(
                err,
                result
              ) 
              {
                if (err) {
                    console.log("error in updating")
                    res.send(err);
                } 
                else {
                    console.log("Updated successfully")
                    res.json(result);
                }
              });

            }
        else 
        {
            console.log('Error in Reservation deletion :' + JSON.stringify(err, undefined, 2)); 
        }

    });
})
// Supprimer Reservation User
router.delete('/deleteRes/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    Reservation.findByIdAndRemove(req.params.id, (err,doc) =>{
        if (!err) { 

            Place.updateOne({ reserved:"false" }, function(
                err,
                result
              ) 
              {
                if (err) {
                    console.log("error in updating")
                    res.send(err);
                } 
                else {
                    console.log("Updated successfully")
                    res.json(result);
                }
              });

            }
        else 
        {
            console.log('Error in Reservation deletion :' + JSON.stringify(err, undefined, 2)); 
        }

    });
})
/////// Trouver reservation par nom de place /////////
router.post('/resPlace',function(req,res){
    try {

        Reservation.find({"palce":req.body.palce})
        .populate('reservation')
        .exec(function (err, reservation) {
            if(err){
              console.log("err");
            } else{
                res.json(reservation);
                console.log(reservation)
            /*let i=0;
            console.log("Time of now " ,timeNow)

            for(i=0;i<reservation.length;i++){
            console.log("TimeF :" ,reservation[i].timeFin )
            if(timeNow > reservation[i].timeFin ){
                console.log("True")
                Place.updateOne({name: req.body.palce},{ reserved: false }, function(
                    err,
                    result
                  ) {
                    if (err) {
                        console.log("error in updating place")
                      res.send(err);
                    } else {
                        console.log("success updating place")
            
                      //res.json(result);
                    }
                  });
                }*/
               /* else{
                    Place.updateOne({name: req.body.palce},{ reserved: true }, function(
                        err,
                        result
                      ) {
                        if (err) {
                            console.log("error in updating place")
                          res.send(err);
                        } else {
                            console.log("success updating place")
                
                          //res.json(result);
                        }
                      });
                      console.log("false")
                }*/



         } })
             
          //  }
         // });



    } catch (err) {
        res.json({message: err.message});

    }

    
})
///////////
router.post('/ResPark',function(req,res){
    try {

        Reservation.find({"park":req.body.park})
        .populate('reservation')
        .exec(function (err, reservation) {
            if(err){
              console.log("err");
            } else{
                res.json(reservation);
                console.log(reservation)
           
         } })
             
        



    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/reservPlace/:palce',function(req,res){
    try {
        let palce=req.params.palce
        Reservation.find({palce},function (err, reservation) {
            if(err){
                res.json(err)
              console.log(err);
            } else{
                
              res.json(reservation);
              console.log(reservation)
            }
          });
        


    } catch (err) {
        res.json({message: err.message});

    }

    
})

//Liste de reservations pour Admin
router.post('/list/listAdminReservation',function(req,res){
    try {
        console.log("Admin id is" +req.body.adminId)
        Reservation.find({"adminId":req.body.adminId})
        .populate('reservation')
        .exec(function (err, listResAdmin) {
            if (err) {
                console.log("err");
                res.json(err)
            } else {
                console.log(listResAdmin)
                res.json(listResAdmin);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

    
})
//Liste de reservations pour User
router.post('/list/listReservation',function(req,res){
    try {
console.log("userId"+req.body.userId)
        Reservation.find({"userId":req.body.userId})
        .populate('reservation')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places r�serv�es par admin
router.post('/reservedP',function(req,res){
    try {
        console.log("adminId To find Place Reserved: "+req.body.adminId);
        Place.find({"adminId":req.body.adminId , reserved:"true"})
        .exec(function (err, listReservedPlaces) {
            if (err) {
                console.log("err");
            } else {
                console.log(listReservedPlaces)
                res.json(listReservedPlaces);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places r�serv�es par admin et park
router.post('/reservedPlaceParPark',function(req,res){
    try {
        console.log("adminId To find Place Reserved: "+req.body.adminId);
        Place.find({"adminId":req.body.adminId ,"park":req.body.park, reserved:"true" })
        .exec(function (err, listReservedPlaces) {
            if (err) {
                console.log("err");
            } else {
                console.log(listReservedPlaces)
                res.json(listReservedPlaces);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places non r�serv�es par admin
router.post('/unreservedP',function(req,res){
    try {
       
        console.log("adminId To find Place Unreserved: "+req.body.adminId);
        Place.find({"adminId":req.body.adminId , reserved:"false"})
        .exec(function (err, listUnReservedPlaces) {
            if (err) {
                console.log("err");
            } else {
                console.log(listUnReservedPlaces)
                res.json(listUnReservedPlaces);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places r�serv�es
router.get('/reserved',function(req,res){
    try {
       
        Place.find({reserved:"true"})
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
    

     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places non r�serv�es
router.get('/unreserved',function(req,res){
    try {
     
        Place.find({reserved:"false"})
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
    
    
     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places attribu�es par admin
router.post('/attributedP',function(req,res){
    try {
        
        
        console.log("adminId To find Place Attributed: "+req.body.adminId);
        Place.find({"adminId":req.body.adminId })
        .exec(function (err,listAttributedPlaces) {
            if (err) {
                console.log("err");
            } else {
                console.log(listAttributedPlaces)
                res.json(listAttributedPlaces);
            }
        });
        
    
     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places attribu�es
router.get('/attributed',function(req,res){
    try {
       
        Place.find()
        .populate('place')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
//Afficher les places attribu�es & non r�serv�es
router.get('/alert',function(req,res){
    try {

        Place.find({attributed:true},{reserved:false})
        .populate('place')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

})
// Envoyer un message
router.post('/addMessage',function(req, res) {
    let message= new Message({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message,
       

    })
  console.log("Message: " +message)
    message=message.save();
    res.json({ status: 'success', message: 'Sent Successfully ' });

    });
// Liste des messages
router.get('/AllMessages',function(req,res){
    try{
        Message.find({},function(err,Message){
            if(err){
                console.log("err");
            }
            else{
                res.json(Message)
            }
        });
    }
    catch(err){
        res.json({message:err.message});
    }
})
//Supprimer un message
router.delete('/deleteMessage/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Message.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
            res.json({ status: 'success', message: 'Deleted Successfully ' });
        } 
        else { console.log('Error in message Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});



// Test de dates
router.post('/calcul',function(req, res) {
    let test= new Test({
        date1:req.body.date1,
        date2:req.body.date2,
        time1:req.body.time1,
        time2:req.body.time2,
        priceH:req.body.priceH,
        priceD:req.body.priceD,
        nbJrs1:(parseInt(req.body.date2) - parseInt(req.body.date1))*24,
        duree:Math.abs(parseFloat(parseFloat(req.body.time2) - parseFloat(req.body.time1))),
        priceT:req.body.priceH * ( ((parseInt(req.body.date2) - parseInt(req.body.date1))*24) + Math.abs(parseFloat(parseFloat(req.body.time2) - parseFloat(req.body.time1)))),
        compte:req.body.compte
    })
    const price = req.body.priceH;
    console.log("Price " +price) ;
    console.log("Test: " +test)
    test=test.save();
    Compte.updateOne({ montant:req.body.data.compte},{montant: req.body.montant - (req.body.priceH * ( ((parseInt(req.body.date2) - parseInt(req.body.date1))*24) + Math.abs(parseFloat(parseFloat(req.body.time2) - parseFloat(req.body.time1)))))}, function(
        err,
        result
      ) {
        if (err) {
            console.log("error in updating amount")
          res.send(err);
        } else {
            console.log("success update of amount")

          res.json(result);
        }
      });
    });
module.exports = router;
