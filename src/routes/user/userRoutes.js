const express = require('express');


const {getIndexFile, getGalleryImages, getWholeGalleryPage, getGalleryEventData, getJoinUsPage} = require('./userRoutesFunction');

const router = express.Router();

router.get('/', getIndexFile);

router.get('/getGalleryImages', getGalleryImages);

router.get('/Gallery', getWholeGalleryPage)

router.get('/Gallery/:event', getGalleryEventData);

router.get('/Join-Us', getJoinUsPage)


module.exports = router;