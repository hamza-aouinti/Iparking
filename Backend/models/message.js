const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const messageSchema = new Schema({
  
   firstName:String,
   lastName:String,
   email:String,
   subject:String,
   message:String,




  



    
});

module.exports = mongoose.model('message', messageSchema, 'message');