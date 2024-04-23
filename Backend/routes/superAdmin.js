var express = require('express');
var router = express.Router();
var localStorage = require('localStorage')
const { jwtkey } = require('../keys');
const jwt = require('jsonwebtoken');
const Admin = require('../models/superAdmin');
var licenseKey = require('nodejs-license-key');
const License=require('../models/licence');
let LICENSE;
let key;
var ObjectId = require('mongoose').Types.ObjectId;

////////// Génération d'une clé de license ///////// 
const userInfo = {
  company: 'www.treetronix.com',
  city: 'Tunis',
  street: 'Rue des Entrepreneurs, charguia 2'
};
const userLicense = {
    info: userInfo,
    prodCode: 'LEN100120',
    appVersion: '1.5',
    osType: 'Ubuntu 18.10'
  };
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'error',
    token,
    data: {
      user
    }
  });
};
/*try{
    this.LICENSE = licenseKey.createLicense(userLicense)
    console.log(this.LICENSE);
    this.key=this.LICENSE.license;
    console.log("Key : ",this.key);
    
  }
  catch(err){
    console.log(err);
  }*/

/*--------------------------------------------------tzid w tod5ol admin ------------------------------------------*/
router.post('/registersa', (req, res) => {
  /*const newLicense= new License({
    adminId:req.id,
    Product:'IParking',
    Key:this.LICENSE.license,
    startDate:new Date(),
    expirationDate:req.body.expirationDate,
    validity:false,
    nbrDevices:req.body.nbrDevices
  });
  const user= new Admin({
    email:req.body.email,
    password:req.body.password,
    license:this.key
  })
  newLicense.save()*/

    //let userData = req.body
    //let user = new Admin(userData)
    const user= new Admin({
      userId:req.id,
      email:req.body.email,
      password:req.body.password,
      license:req.body.license
    })
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
            
        } else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ user, token })
        }
    })
})


router.post('/loginsa', async(req, res) => {
  try{
    const { email, password } = req.body
    
    if (!email || !password) {
        //return res.json({ status: 'err', message: 'Error' });
        res.send({ error: "must provide email or password" })

    }
  
    const user = await Admin.findOne({ email})
    if (!user) {

        res.json({ status: 'err', message: 'Error' });
       //res.send({ error: "must provide email or password" })

    } else {
      
        await user.comparePassword(password);
        localStorage.setItem('am', 'yes');
        res.json({ status: 'success', message: 'Logged In successfully' });

        /*const token = jwt.sign({ userId: user._id }, jwtkey);
        res.status(200).send({ user, token })*/



    }}
    catch(e){
      console.log(e)
    }
});



/* ------------------------------------------ traja3lik list ta3 les admin l kol -------------------------*/
router.get('/list/sadmin', function(req, res) {
    Admin.find({})
        .exec(function(err, lisP) {
            if (err) {
                console.log("err");
            } else {
                res.json(lisP);
            }
        });
});
//////////////////// get admin par id ////////
router.post('/admin', function(req, res) {
  Admin.find({"_id":req.body._id})
      .exec(function(err, admin) {
          if (err) {
              console.log("err");
          } else {
              res.json(admin);
          }
      });
});
/*-------------------------------------------------bch tfasa5 admin-------------------------------------------*/
router.delete('/list/sadmin/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Admin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;

/* -------------------------------------------------bch ta3mil compte --------------------------------------
router.post('/registersa', (req, res) => {
    let userData = req.body
    let user = new Admin(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: user._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
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
  }) 
 router.post('/loginsa',async (req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await Admin.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    } else {
      await user.comparePassword(password); 
      localStorage.setItem('am', 'yes');
      const token = jwt.sign({userId:user._id},jwtkey);
      res.send({token});

    }
})*/ 