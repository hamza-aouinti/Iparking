const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const reservationSchema = new Schema({
    park: String,
    palce: String,
    matricule:String,
    dateDebut:String,
    dateFin:String,
    timeDebut:String,
    timeFin:String,
    priceH:String,
    priceD:String,
    priceW:String,
    userId:String,
    adminId:String,
    totalPrice:Number,
    

   

});

module.exports = mongoose.model('reservation', reservationSchema, 'reservation');