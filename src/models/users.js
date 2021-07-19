const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const bcrypt = require('bcrypt');

const cryptr = new Cryptr(process.env.cryptr_secretkey);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase() === 'password') throw new Error('invalid Password');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    let user = this;
    let token = jwt.sign({_id: user._id.toString()}, process.env.jwt_key);
    const encryptedToken = cryptr.encrypt(token);
    user.tokens.push({token});
    await user.save();
    return encryptedToken;
}

userSchema.statics.findByCredentials = async (userName, Password) => {
    let user = await User.findOne({userName});
    if (!user) return undefined;
    let isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return undefined;
    return user;
}

const User = mongoose.model('User', userSchema);


module.exports = User;