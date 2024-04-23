const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceWeekSchema = new Schema({
    valeur: String,
    date: String,
    park:String,

  
});

module.exports = mongoose.model('priceWeek', priceWeekSchema, 'priceWeek');