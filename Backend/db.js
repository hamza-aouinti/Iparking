const mongoose = require('mongoose');

//mongoose.connect('mongodb://Iparking:123456789@localhost/Iparking', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
mongoose.connect('mongodb://localhost:27017/Iparking', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, (err) => {

    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;
