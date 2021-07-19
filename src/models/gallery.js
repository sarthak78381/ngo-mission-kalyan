const mongoose = require('mongoose');


const gallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    addedBy: {
        type: String,
        required: true
    },
    images: [String]
}, {
    timestamps: true
})



const Gallery = mongoose.model('Gallery', gallerySchema);


module.exports = Gallery;