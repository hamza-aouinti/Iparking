var express = require('express');
var router = express.Router();
var price = require('../models/priceDay');
var lisP = require('../models/parking');



var ObjectId = require('mongoose').Types.ObjectId;


//Ajouter de l'argent
router.post('/addPriceDay', (req, res) => {
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


//Supprimer de l'argent
router.delete('/list/priceDay/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    price.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Price Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  }); 


//Liste des prix
router.get('/list/priceDay', function(req,res)  {
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