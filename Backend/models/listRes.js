const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listResSchema = new Schema({
    name: String,
    matricule: String,
    dateE: String,
    dateS: String,
    Tpark: String,
    timeE: String,
    timeS: String,
    place: String,
    typeCar: String
});

module.exports = mongoose.model('listRes', listResSchema, 'listReservation');