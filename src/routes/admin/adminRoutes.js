const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../../models/gallery');

const auth = require('../../middlewares/auth');


const {getAdminLoginPage, errorInAdminLogin, getAdminPage, LoginInToAdmin, addNewAdmin, getNewAdminSignUpPage, logOutAdmin, changeAdminPassword, getChangeAdminPasswordPage, DeleteGallery, getUploadGalleryPage, dataFromGalleryUpload, getDeleteGalleryPage, checkForGallery} = require('./adminRoutesFunction');
 
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let type = req.body.name;
        let filePath = path.join(__dirname, '../', '../', 'GalleryImages', `${type}`);
        var stat = null;
        try {
            stat = fs.statSync(filePath);
        } catch (err) {
            fs.mkdirSync(filePath);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists');
        }
        callback(null, filePath);
      },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploads = multer({
    storage,
    async fileFilter(req, file, cb) {
        let images = await Gallery.findOne({name: req.body.name});
        if (images) {
            return cb(new Error('Name Already Exist'));
        }
        if (!file.originalname.match('\.(jpeg || jpg || png)$')) return cb(new Error('invalid file type'))
        return cb(undefined, true)
    }
})

router.get('/admin/login',auth, getAdminLoginPage);

router.get('/admin/login/error',auth, errorInAdminLogin)

router.get('/admin/Add-New-Admin', auth, getNewAdminSignUpPage)

router.get('/admin/Dashboard', auth, getAdminPage);

router.get('/admin/Change-Password', auth, getChangeAdminPasswordPage);

router.get('/admin/logout', auth, logOutAdmin)

router.post('/admin/login', auth, LoginInToAdmin)

router.post('/admin/Add-New-Admin', auth, addNewAdmin)

router.post('/admin/Change-Password', auth, changeAdminPassword);


// admin upload gallery routes

router.get('/admin/Upload-Gallery', auth,getUploadGalleryPage)

router.post('/admin/Gallery-Upload', auth, uploads.array('files') ,dataFromGalleryUpload);

// admin Delete Gallery routes


router.get('/admin/Delete-Gallery', auth, getDeleteGalleryPage);

router.get('/admin/Check-For_gallery', auth, checkForGallery);

router.get('/admin/Deleting-Gallery', auth, DeleteGallery);

module.exports = router;