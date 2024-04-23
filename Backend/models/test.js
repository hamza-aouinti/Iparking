const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const testSchema = new Schema({
  
   date1:String,
   date2:String,
   time1:String,
   time2:String,
   priceH:Number,
   priceD:Number,
   nbJrs1:Number,
   duree:Number,
   priceT:Number,
   compte:String




  



    
});

module.exports = mongoose.model('test', testSchema, 'test');








