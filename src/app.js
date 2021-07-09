const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const UserRouters = require('./routes/user');
const AdminRouters = require('./routes/admin');

const app = express();

app.use(express.static(path.join(__dirname, '../', 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use(UserRouters);
app.use(AdminRouters);

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'pageNotFound.html'))
})

app.listen(3000, () => {
    console.log('server running on port 3000');
})