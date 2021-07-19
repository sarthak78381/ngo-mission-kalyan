const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Cryptr = require('cryptr');

const cryptr = new Cryptr(process.env.cryptr_secretkey);

const auth = async (req, res, next) => {
    try {
        let encryptedToken = req.cookies.adminToken; 
        if (encryptedToken) {
            let token = cryptr.decrypt(encryptedToken);
            const isVerified = jwt.verify(token, process.env.jwt_key);
            const user = await User.findOne({_id: isVerified._id, "tokens.token": token});
            if (user) {
                req.adminToken = token
                req.user = user;
            }
            next(); 
        } else {
            next()
        }
    } catch(error) {
        console.log(error.message)
        res.redirect('/admin/login');
    }
}

module.exports = auth;