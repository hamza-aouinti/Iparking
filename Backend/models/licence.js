const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
const LicenseSchema = new Schema({
    adminId:{
        type: Schema.Types.ObjectId,
        ref: 'sAdmin',
        default: null
    },
    Product:{
        type:String,
        default: 'IParking'
    },
    Company:String,
    Key:{
        type:String,
        unique:true
    },
    Status: {
        type: Boolean,
        default: true
    },
    startDate:Date,
    expirationDate:Date,
    Valide: {
        type: Boolean,
        default: true
    },    
    nbrDevices:Number,
 });
 
 module.exports = mongoose.model('License', LicenseSchema, 'License');