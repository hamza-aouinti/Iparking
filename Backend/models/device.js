const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const deviceSchema = new Schema({
    DevEUI_uplink: {
        Time: String,
        DevEUI: String,
        payload_hex: String,

    }
});

module.exports = mongoose.model('device', deviceSchema, 'devices');;