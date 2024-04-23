const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const capteurSchema = new Schema({
    code:String,
    type:String,
    data:[],
    

   

});

module.exports = mongoose.model('capteur', capteurSchema, 'capteur');