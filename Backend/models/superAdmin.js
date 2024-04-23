const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const superAdminSchema = new Schema({
    email: String,
    password: String,
    session: { type: String, default: "Supadmin" },
    license:{
        type: Schema.Types.ObjectId,
        ref: 'License',
        default: null
    },
    dateCreation: {
        type: Date,
        required: true,
        default: Date.now()
      },

});
superAdminSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        })

    })

})


superAdminSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(err)
            }
            resolve(true)
        })
    })

}

module.exports = mongoose.model('sAdmin', superAdminSchema, 'sAdmins');