var express = require('express');
var router = express.Router();
var lis = require('../models/listRes');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

var ObjectId = require('mongoose').Types.ObjectId;
var k = 0;

//Liste des réservations
router.get('/list/res', function(req, res) {
    lis.find({})
        .exec(function(err, listRes) {
            if (err) {
                console.log("err");
            } else {
                res.json(listRes);

            }
        });
});

// router.get('/list/res', (req,res)=>{
//     lis.find({},(err , data)=>{
//         if(data){
//             res.status(200).json(data)
//         }else{
//             console.log(err)
//         }
//     })
// });

router.route('/:matricule').get(function(req, res) {
    let matricule = req.params.matricule;
    lis.find({ matricule }, function(err, listRes) {
        if (err) {
            console.log("err");
        } else {
            res.json(listRes);
        }
    });
});
router.route('/list/res/:name').get(function(req, res) {
    let name = req.params.name;

    lis.find({ name }, function(err, listRes) {
        if (err) {
            console.log("err");
        } else {
            res.json(listRes);
        }
    });
});

router.post('/saveres', (req, res) => {
    var list = new lis();
    list.name = req.body.name;
    list.matricule = req.body.matricule;
    list.Tpark = req.body.Tpark;
    list.dateE = req.body.dateE;
    list.dateS = req.body.dateS;
    list.timeE = req.body.timeE;
    list.timeS = req.body.timeS;
    list.place = req.body.place;
    list.typeCar = req.body.typeCar;

    list.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            res.json(list)
        }
    })
})

// Supprimer Reservation
router.delete('/list/d/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lis.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Reservation Deletion :' + JSON.stringify(err, undefined, 2)); }
    });
});


// Sta Reservation
router.get('/stat/:park', (req, res) => {
  
    let lineChartLabels = []  
    let lineChartLabel = [] 
   lineChartLabel=moment.monthsShort()
   
   var labelChart = [{ data: [], label: req.params.park}];
   for (let mois = 1; mois < 13; mois++) {
      lineChartLabels.push(getMonthDateRange.getMonthDateRange('2022',mois));
    }
    let data=[]
    forEach(lineChartLabels , async (mois, index) => {
  
    const promise = new Promise(async (resolve, reject) => {
     
      const park=  await  Order.find({ dateDebut: { $lte: mois.end, $gte: mois.start }, park: req.params.park })
     
         resolve([park.length]);
      }).then((r)=>{
        return r;
      })
      data.push(promise)
   
    }) 
    Promise.all(data).then((resp)=>{
      resp.forEach(element => {
        labelChart[0].data.push(element[0])
        
      });
    return res.status(200).send({"lineChartLabel":lineChartLabel,"labelChart":labelChart})
  
    })
   
     
   
  
});

module.exports = router;