const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const placeTestSchema = new Schema({
name:String,
attributed:Boolean,
reserved:Boolean,
park:String,
adminId:String,
code: {
    type: String,
    unique: true 
   },
   Capteur:[{
       status:Number,
       battery:Number
   }],
   //dataKafka:[],
   lng:String,
lat:String,
});

module.exports = mongoose.model('placeTest', placeTestSchema, 'placeTest');