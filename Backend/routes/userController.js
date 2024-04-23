var express = require('express');
var router = express.Router();
var localStorage = require('localStorage')
const { jwtkey } = require('../keys');
const jwt = require('jsonwebtoken');
var User = require('../models/user');
var _ = require('lodash');
const bcrypt = require('bcrypt')


const nodemailer = require('nodemailer');
const { Error } = require('mongoose');

var ObjectId = require('mongoose').Types.ObjectId;

/*------------------------------------------------------traj3lik list user ----------------------*/
router.get('/list/user', function (req, res) {
  User.find({})
    .exec(function (err, lisP) {
      if (err) {
        console.log("err");
      } else {
        res.json(lisP);
      }
    });
});
router.get('/list/user/email/:email', function (req, res) {
  User.findOne({ email: req.params.email })
    .exec(function (err, lisP) {
      if (err) {
        console.log("err");
      } else {
        res.json(lisP);
      }
    });
});

router.post('/send/code', function (req, res) {
  console.log(req.body)
  let cd = req.body.code.toString()
  let mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "znegui.chaima@gmail.com",
      pass: "qaxjkuqsbeovawxh"
    }
  })

  let details = {
    from: "znegui.chaima@gmail.com",
    to: req.body.email,
    subject: "Code sécurité",
    text: cd
  }

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err)
      res.status(404).json('no')
    }else{
      res.json('ok')
    }
  })

})

router.get('/getuser/:email', function (req, res) {
  let email = req.params.email;
  User.find({ email }, function (err, lisP) {
    if (err) {
      console.log("err");
    } else {
      res.json(lisP);
    }
  });
});


/* -------------------------------------------------bch ta3mil compte --------------------------------------*/
router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)
    } else {
      let payload = { subject: user._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token })
    }
  })
})


/*-----------------------------------------------------ta3 login -------------------------------------------*/
/*  router.post('/login', (req, res) => {
   let userData = req.body
   User.findOne({email: userData.email}, (err, user) => {
     if (err) {
       console.log(err)    
     } else {
       if (!user) {
         res.status(401).send('Invalid Email')
       } else 
       if ( user.password !== userData.password) {
         res.status(401).send('Invalid Password')
       } else {
         let payload = {subject: user._id}
         let token = jwt.sign(payload, 'secretKey')
         res.status(200).send({token})
       }
     }
   })
 }) */
 router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send({ error: "Must provide email or password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("No login");
      return res.status(422).send({ error: "Invalid email or password" });
    } else {
      console.log("Successful login");
      await user.comparePassword(password);
      localStorage.setItem('am', 'yes');
      const token = jwt.sign({ userId: user._id }, jwtkey);
      res.json({ status: 'success', message: 'Logged In successfully', token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/changePassword/:id', async (req , res )=>{
  const salt = await  bcrypt.genSalt(10);
  const newPass= await  bcrypt.hash(req.body.pass, salt)
  User.findByIdAndUpdate({_id : req.params.id} , {password : newPass} , (err , data)=>{
    if(data){
      res.status(200).json('password chaged')
    }else{
      res.status(404).json(err)
    }
  })
})

/*-------------------------------------------------------------bch tmodifi user --------------------------------------*/

router.put('/list/user/:email', function (req, res, next) {
  // fetch user
  User.findOne({ "email": req.params.email }, function (err, post) {
    if (err) return next(err);

    _.assign(post, req.body); // update user
    if (post != null) {
      post.save(function (err) {
        if (err) return next(err);
        return res.json(200, post);
      })
    }
    else {
      console.log("thabet");
      return next(err);
    }
  });
});

module.exports = router
