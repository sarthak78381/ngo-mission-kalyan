const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');

const User = require('../../models/users');
const Gallery = require('../../models/gallery');

const getNewAdminSignUpPage = (req, res) => {
    if (req.user) return res.render('addNewAdmin');
    return res.redirect('/admin/login')
}

const getAdminLoginPage = (req, res) => {
    if (req.user) return res.redirect('/admin/Dashboard');
    return res.render('login');
}

const errorInAdminLogin = (req, res) => {
    if (req.user) return res.redirect('/admin/Dashboard');
    return res.render('loginError');
}

const LoginInToAdmin = async (req, res) => {
    try{
        let {userName, Password} = req.body;
        userName = userName.trim();
        Password = Password.trim();
        if (!userName || !Password) return res.redirect('/Admin-Login/error');
        const user = await User.findByCredentials(userName, Password);
        if (!user) throw new Error();
        let token = await user.generateAuthToken();
        res.cookie('adminToken', token, { maxAge: 60000 * 60 * 2})
        res.redirect("/admin/Dashboard");
    }catch (e) {
        res.redirect('/admin/login/error')
    }
}

const logOutAdmin = async (req, res) => {
    try {
        let {user, adminToken} = req;
        if (user) {
            user.tokens = user.tokens.filter(eToken => eToken.token !== adminToken);
            await user.save();
        }
    } catch(error) {
        return res.redirect('/');
    }
}

const addNewAdmin = async (req, res) => {
    try {
        const {userName, Password: pass, name} = req.body
        const Password = await bcrypt.hash(pass, 8)
        const new_User = new User({userName, name, Password});
        await new_User.save();
        return res.redirect('/');
    } catch(error) {
        res.status(400);
        res.send(error.message);
    }
}

const getAdminPage = (req, res) => {
    if (req.user) {
        return res.render('adminPage', {
            name: req.user.name.toUpperCase()
        });
    } 
    return res.redirect('/admin/login')
}

const getChangeAdminPasswordPage = async (req, res) => {
    if (req.user) {
        return res.render('adminChangePassword', {
            name: req.user.name.toUpperCase()
        });
    }
    return res.redirect('/admin/login');
}

const changeAdminPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    let isMatch = await bcrypt.compare(oldPassword, req.user.Password);
    if (isMatch) {
        console.log('yes')
        req.user.Password = await bcrypt.hash(newPassword, 8);
        await req.user.save();
        res.redirect('/admin/Dashboard');
    } else {
        res.send('<script>alert("Old Password Is Incorrect")</script>')
    }
}

const getUploadGalleryPage = (req, res) => {
    if (req.user) {
        return res.render('uploadGallery');
    }
    return res.redirect('/admin/login');
}

const dataFromGalleryUpload = async (req, res) => {
    if (req.user) {
        const imagesName = req.files.map(file => file.filename)
        let new_gallery = new Gallery({
            name: req.body.name,
            addedBy: req.user.userName,
            images: imagesName
        })
        await new_gallery.save();
        return res.redirect('/admin/Dashboard')
    }
    return res.redirect('/admin/login');
}

const getDeleteGalleryPage = (req, res)  => {
    if (req.user) {
        return res.render('deleteGallery');
    }
    return res.redirect('/admin/login');
}
const checkForGallery = async (req, res)  => {
    if (req.user) {
        const gallery = await Gallery.findOne({name: req.query.name});
        if (gallery) {
            const files = fs.readdirSync(path.join(__dirname, '../', '../', 'GalleryImages', `${req.query.name}`));
            const imagesLink = files.map(file => `/${req.query.name}/${file}`)
            return res.send({ok:true, imagesLink});
        } else {
            return res.status(404).send({ok: false})
        }
    }
    return res.redirect('/admin/login');
}

const DeleteGallery = async (req, res) => {
    if (req.user) {
        await Gallery.deleteOne({name: req.query.name});
        fs.rmdirSync(path.join(__dirname, '../', '../', 'GalleryImages', `${req.query.name}`), {recursive: true});
        return res.json({ok: true})
    }
}



module.exports ={
    getNewAdminSignUpPage,
    getAdminLoginPage,
    errorInAdminLogin,
    LoginInToAdmin,
    addNewAdmin,
    getAdminPage,
    logOutAdmin,
    getChangeAdminPasswordPage,
    changeAdminPassword,
    getUploadGalleryPage,
    dataFromGalleryUpload,
    getDeleteGalleryPage,
    checkForGallery,
    DeleteGallery
}