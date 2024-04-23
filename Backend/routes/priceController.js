var express = require('express');
var router = express.Router();
var price = require('../models/price');
var lisP = require('../models/parking');



var ObjectId = require('mongoose').Types.ObjectId;


//Ajouter de l'argent
router.post('/addPrice', (req, res) => {
    var list = new price();
    list.valeur = req.body.valeur;
    list.date = req.body.date;
    list.park=req.body.park;
     list.save((err, registeredUser) => {
       if (err) {
         console.log(err)      
       } else {
       res.json(list)
       }
     })
   })

//Mettre à jour un prix
router.put('/updatePrice/:name', (req, res) => {
 

  var priceH = {
    valeur : req.body.valeur,
    date : req.body.date,
    park:req.body.park,
  };
  price.findByIdAndUpdate(req.params.park, { $set: priceH }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); } 
      else { console.log('Error in Price Update :' + JSON.stringify(err, undefined, 2)); }
  });
});
//Supprimer de l'argent
router.delete('/list/price/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    price.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Price Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  }); 


//Liste des prix
router.get('/list/price', function(req,res)  {
    price.find({})
    .exec(function(err, listPrice){
      if(err){
        console.log("err");
      } else{
        res.json(listPrice);
      }
    });
});


module.exports = router