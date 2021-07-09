const express = require('express');
const path = require('path');
const { redirect } = require('statuses');

const router = express.Router();

let admininfo = {
    "sarthak": "gupta"
}

router.get('/Admin-Login', (req, res) => {
    res.sendFile(path.join(__dirname, '../' ,'views', 'login.html'))
})

router.get('/Admin-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'adminPage.html'));
})

router.post('/Admin-Login', (req, res) => {
    let {userName, Password} = req.body;

    userName = userName.trim().toLowerCase();
    Password = Password.trim().toLowerCase();

    console.log(userName, Password)

    if (!userName || !Password) return res.redirect('/Admin-Login');

    if (!admininfo[userName]) return res.redirect('/Admin-Login');

    if (admininfo[userName] !== Password) return res.redirect('/Admin-Login')

    res.redirect('/Admin-page');

})

module.exports = router;