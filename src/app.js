const path = require('path');

require('./mongodb/mongodb');

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const UserRouters = require('./routes/user/userRoutes');
const AdminRouters = require('./routes/admin/adminRoutes');

const app = express();

const {PORT} = process.env;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.static(path.join(__dirname, 'GalleryImages')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())


app.use(UserRouters);
app.use(AdminRouters);

app.use('*', (req, res) => {
    res.render('pageNotFound')
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
})