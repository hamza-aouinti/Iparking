var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var licenseKey = require('nodejs-license-key');
const License=require('../models/licence');
const SuperAdmin=require('./../models/superAdmin')
let LICENSE;
let key;
////////// Génération d'une clé de license ///////// 

  /*try{
    this.LICENSE = licenseKey.createLicense(userLicense)
    console.log(this.LICENSE);
    this.key=this.LICENSE.license;
    console.log("Key : ",this.key);


  }
  catch(err){
    console.log(err);
  }*/

  ///// Ajouter une license //////
  router.post('/addLicense',function(req,res){
    const dateNow=Date.now();
    const userInfo = {
      company: req.body.Company      
    };
    const userLicense = {
        info: userInfo,
        prodCode: 'LEN100120',
        appVersion: '1.5',
        osType: 'Ubuntu 18.10'
      };
    try {
      this.LICENSE = licenseKey.createLicense(userLicense)
      console.log(this.LICENSE);
      this.key=this.LICENSE.license;
      console.log("Key : ",this.key);
      const date = new Date();
      date.setDate(date.getDate() + 30);
      const free = date.toJSON();
      console.log("Free :",free);
      const newLicense= new License({
          adminId:req.body.adminId,
          Company:req.body.Company,
          Key:this.LICENSE.license,
          startDate:Date.now(),
          expirationDate:req.body.expirationDate,
          nbrDevices:req.body.nbrDevices,
        });
        try{
          License.findOne({Key:this.LICENSE.license}, async function(err, foundObject){
            if(foundObject){
              res.json({ status: 'err', message: 'License key already exists !' });

            }
            else{
              newLicense.save()
              .then(data => {
                 //res.json ({status :'succes', message :'License added successfully'})
                 //res.send(data)
                 res.json({
                  status: 'success',
                  mesage: `License Key :${data.Key}`
                          })
                 })
                 
              .catch(error => { 
                console.log("Error" ,error);
                
                res.status(400).send('Error in saving license in Database ! ')
              })
            }
          })
          
  
        }
        catch(e){
          console.log('Error ', e);
        }
       
     
    } catch (err) {
        res.json({message: err.message});
        console.log("Error" ,err);

    }
    })
    //////////// Liste des licenses /////////////
    router.post('/ListLicense',function(req,res){
      try {
            License.find({})
            .exec()
            .then(docs => {
              res.send(docs)
              //res.status(200).json(docs);
            })
           .catch(err => {
              res.status(500).json({
              error: err
            });
          });
        } catch (err) {
            res.json({message: err.message});
    
        }
    })
    /////////////////// Get License par Admin ////////////
    router.post('/getLicenseByAdmin',function(req,res){
    
      try {
            License.find({"adminId":req.body.adminId})
            .exec()
            .then(docs => {
              res.send(docs)
              //res.status(200).json(docs);
            })
           .catch(err => {
              res.status(500).json({
              error: err
            });
          });
        } catch (err) {
            res.json({message: err.message});
    
        }
    })
    /////////// Get License by id ////////
    router.post('/getLicenseByID',function(req,res){
    
      try {
        
            License.find({"_id": req.body.id })
            .exec()
            .then(docs => {
              res.send(docs)
              //res.status(200).json(docs);
            })
           .catch(err => {
              res.status(500).json({
              error: err
            });
          });
        } catch (err) {
            res.json({message: err.message});
    
        }
    })
    /////////// Validate License Key /////////
    router.post('/validateKey',function(req,res){

    const userInfo = {
      company: req.body.Company      
    };
    const userLicense = {
        info: userInfo,
        prodCode: 'LEN100120',
        appVersion: '1.5',
        osType: 'Ubuntu 18.10'
      };
      const license = licenseKey.validateLicense(userLicense, 
        '3Z2RG-62WUD-T2VV8-43DD8-D76BD-0A8AD');
        
        console.log("License : ",license);
        res.send(license)
    });
    //////////////// Vérifier la validité de la license par ID////////
    exports.VerifValidity = async(req,res) => {
      let Test = false;
      try {
        const license = await License.find({ "_id": req.body.id });
        console.log("License by ID " ,license);
        const dateToday = new Date();
        const endDate = license[0].expirationDate;
        console.log("Start date : " ,dateToday);
        console.log("Expiration date ", endDate);
        if (dateToday > endDate) {
          console.log('False ==> License Expired');
          license[0].Valide = false;
          license[0].save();
          res.json("License Expired");
        } 
        else if (dateToday <= endDate) {
          console.log('True ==> License Valide');
          Test = true;
          res.json("License Valide");
        }
      } catch (err) {
        res.json({ message: err });
      }
    }
    //router.get('/VerifValidity/:id',this.VerifValidity)
    router.post('/VerifValidity',this.VerifValidity)


    ///////////// Verifier la licence gratuite //////////
    exports.VerifFreeLicense = async(req,res) => {
      try {
        //const admin = await SuperAdmin.findById(req.params.id);
        //const admin=await SuperAdmin.findById({_id:req.body.id})
        const admin=await SuperAdmin.findById({"_id":req.body._id})

        const date1 = admin.dateCreation;
        console.log("Date de Création de cet Admin ",date1);
        const date2 = new Date();
        console.log("Date of Today ",date2);
        const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
        res.json(diffDays);

        console.log("Différence de jours ",diffDays);
        console.log("Nbre de jours restant en license gratuite :" ,(14 -diffDays))
        const device = 10; //gives day difference
      } 
      catch (err) {
        res.json({ message: err });
      }
    }
    router.post('/VerifFreeLicense',this.VerifFreeLicense)
    //router.post('/VerifFreeLicense',this.VerifFreeLicense)



    //////////////// Activer une clé de license ////////////
    exports.ActivateLicense = async (req, res) => {
      try {
        console.log("Id",req.params.id);
        console.log("Key",req.params.Key);
        const license = await License.find({ "Key": req.params.Key });
        console.log("License :" ,license);
        if (license[0].Status === true) {
          license[0].Status = false;
          license[0].save();
          console.log(license[0]._id);
         
          const updated = await SuperAdmin.findByIdAndUpdate(
            { _id: req.params.id },
            {$set: {license: license[0]._id}},
            { new: true, useFindAndModify: false }
          );
          console.log('Ok');
          res.json('Welcome To IParking');
        } else {
          res.json('This Key is already used');
        }
      } catch (err) {
        console.log(err);
    
        res.json({ message: err });
      }
    };
    router.get('/ActivateLicense/:id/:Key', this.ActivateLicense);






























    /*
    /////////// Modifier une License ///////////
    router.put('/updateLicense/:id', (req,res) => {
     
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        const updateLicense = {
          Product:req.body.Product,
          expirationDate: req.body.expirationDate,
          //validity: req.body.validity,
          nbrDevices:req.body.nbrDevices
        };
        License.findByIdAndUpdate(req.params.id, { $set: updateLicense }, { new: true }, (err, doc) => {
          if (!err) {res.send(doc); } 
          else { console.log('Error in Account Update :' + JSON.stringify(err, undefined, 2));
          console.log('Error in License Update :' + err); }
      });
      
        });


    ////////// Vérifier la validité d'une license par clé///////
   
    exports.verifylicense = async (req, res) => {
      try {
        const license = await License.find();
        console.log("License key :",license[0].Key);
        console.log("Entered key",req.body.Key);
        if (license[0].Key === req.body.Key) {
          console.log("Les Keys sont conformes");
          const currentdate = new Date();
          currentdate.setDate(currentdate.getDate() );
          console.log("Current date :" ,currentdate)
          console.log("Expiration date :" ,license[0].expirationDate)
          if(license[0].expirationDate >= currentdate){
            license[0].validity = true;
            console.log("License valide !")
            res.json({ status: 'success', mesage: 'License is still valide' });
            license[0].save();

          }
          else {
            license[0].validity = false;
            license[0].save();
            res.json({ status: 'error', mesage: 'License expired !' });
          }
          //const onemonth = currentdate.toJSON();
          //console.log("One month :" ,onemonth);
          //license[0].expirationDate = onemonth;
          //  console.log(tomorrow);
          
          //  licence[0].expired === licence[0].expired + 15;
        } 
        else{
          console.log("Pas de license avec cette clé !");
          res.json({ status: 'Erreur', mesage: 'Pas de license avec cette clé !' });

          
        }
      } catch (err) {
        console.log(err);
    
        res.json({ message: err });
      }
    };
    router.route('/verifyLicense').post(this.verifylicense);*/
    
    
       
       
      

    

  

    module.exports = router;
