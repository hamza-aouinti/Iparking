var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var user = require('../models/user');


router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "iparkingtree@gmail.com",
        pass:"iparking2021"
      }
    });
  
    let mailOptions = {
      from: 'iparkingtree@gmail.com', // sender address
      to: "znegui.chaima@gmail.com", // list of receivers
      subject: "Alert !!", // Subject line
      html: `<h3> Hi IParking Administrator </h3><br>
      <h4>  There is a car in the park with no reservation !  </h4>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }
  
module.exports = router