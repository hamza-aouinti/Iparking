const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceDaySchema = new Schema({
    valeur: String,
    date: String,
    park:String,

  
});

module.exports = mongoose.model('priceDay', priceDaySchema, 'priceDay');