var express = require('express');
var router = express.Router();
var localStorage = require('localStorage')
const { jwtkey } = require('../keys');
const jwt = require('jsonwebtoken');
const Admin = require('../models/superviseur');

var ObjectId = require('mongoose').Types.ObjectId;



/*--------------------------------------------------tzid w tod5ol admin ------------------------------------------*/
router.post('/registers', (req, res) => {
    let userData = req.body
    let user = new Admin(userData)
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


router.post('/logins', async(req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).send({ error: "must provide email or password" })
    }
    const user = await Admin.findOne({ email })
    if (!user) {
        return res.status(422).send({ error: "must provide email or password" })
    } else {
        await user.comparePassword(password);
        localStorage.setItem('am', 'yes');
        const token = jwt.sign({ userId: user._id }, jwtkey);
        res.send({ user, token });

    }
});



/* ------------------------------------------ traja3lik list ta3 les admin l kol -------------------------*/
router.get('/list/s', function(req, res) {
    Admin.find({})
        .exec(function(err, lisP) {
            if (err) {
                console.log("err");
            } else {
                res.json(lisP);
            }
        });
});
/*-------------------------------------------------bch tfasa5 admin-------------------------------------------*/
router.delete('/list/superviseur/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Admin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;