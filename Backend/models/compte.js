const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const compteSchema = new Schema({
   userId:{
      type :String,
      unique:true
   },
   add:Number,
   numCard:String,
   code:String,
   montant:String,

  



    
});

module.exports = mongoose.model('compte', compteSchema, 'compte');