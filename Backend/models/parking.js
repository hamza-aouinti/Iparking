const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const parkSchema = new Schema({
    name: String,
    latitude: String,
    longitude: String,
    des:String,
    price: String,
    priceD:String,
    priceW:String,
    nbplace: String,
    capteur: [{ firstName: String, lastName: String,reservation:Boolean }],
    image: String,
    userId:String,
    reservation: [{ type: Schema.Types.ObjectId, ref: 'listRes' }]

});

module.exports = mongoose.model('parking', parkSchema, 'parking');
/*var Park=mongoose.model('Park',{
    name: String,
    latitude: String,
    longitude: String,
    des:String,
    price: String,
    priceD:String,
    priceW:String,
    description:String,
    nbplace: String,
    capteur: [{ firstName: String, lastName: String,reservation:Boolean }],
    image: String,
    userId:String,
    reservation: [{ type: Schema.Types.ObjectId, ref: 'listRes' }]
});
module.exports={ Park } */
