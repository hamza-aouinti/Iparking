const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const http = require('http').createServer(express);
const io = require('socket.io')(http);
const bcrypt = require('bcrypt')

// Defining the PORT
const port = 3007;

// Initialize the app
const app = express();


// Mongodb Config
const { mongoose } = require('./db.js');

console.log("test")

const admin = require('./routes/adminController');
const superviseur = require('./routes/superviseurController');
const paypal = require('./routes/paypal');
const parkController = require('./routes/parkController.js');
const reservationController = require('./routes/reservationController');
const user = require('./routes/userController');
const superAdmin = require('./routes/superAdmin');
const priceController = require('./routes/priceController');
const priceDayController = require('./routes/priceDayController');
const priceWeekController = require('./routes/priceWeekController');

const sendEmail = require('./routes/sendEmail');
const producerController = require('./routes/kafkaController/producerController');
const consumerController = require('./routes/kafkaController/consumerController');
const chatServer = require('./routes/chatController/chatServer');
const licenseController=require('./routes/licenceController');
var lis = require('./models/listRes');

// Defining the Middlewares
//app.use(cors())
    // Set the static folder
app.use(express.static(path.join(__dirname, 'dist')));
// BodyParser Middleware


app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', admin);
app.use('/api', superviseur);
app.use('/api', superAdmin);
app.use('', paypal);
app.use('/api', parkController);
app.use('/api', reservationController);
app.use('/api', user);
app.use('/api', priceController);
app.use('/api', priceDayController);
app.use('/api', priceWeekController);
app.use('/api', licenseController);
app.use('/api', sendEmail);
app.use('/api', producerController);
app.use('/api', consumerController);
app.use('', chatServer);
app.use(cors({origin:'http://localhost:4200'}));
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.get("/", function(req, res) {
    res.send(`<h2>hello 3of</h2>`);
})
console.log("x")
const verifyPasswors = async()=>{
    const match = await bcrypt.compare("LOOL16pop", "$2b$10$FSs6dzBMrP2n5ddF6mMrYOlawTO2zM67Xs8q4LScs3SNapxkDlKda")
 
    console.log(match)
}
verifyPasswors()
console.log("hi")

//app.listen(3007, '51.210.182.172');
app.listen(3007);

/*app.listen(port, function() {
    console.log("Server running on localhost:" + port);

});*/
