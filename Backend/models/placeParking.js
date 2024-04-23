const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const placePSchema = new Schema({
name:String,
attributed:Boolean,
reserved:Boolean,
park:String,
adminId:String,
code: {
    type: String,
    unique: true 
   },
   Capteur:[],
lng:String,
lat:String,
});

module.exports = mongoose.model('placesParking', placePSchema, 'placesParking');