const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const globalSensorSchema = new Schema({
    DevEUI:{
        type:String,
        unique:true
    },
    type:String,
    status:String,
    battery:String

    

   

});

module.exports = mongoose.model('globalSensor', globalSensorSchema, 'globalSensor');