const fs = require('fs');

const path = require('path');
const Gallery = require('../../models/gallery');

const sortFilesDirectoryByTime = (GalleryPath) => {
    let file = fs.readdirSync(GalleryPath);
    file.sort((a, b) => {
        let aStat = fs.statSync(`${GalleryPath}/${a}`),
            bStat = fs.statSync(`${GalleryPath}/${b}`);
        
        return new Date(bStat.birthtime).getTime() - new Date(aStat.birthtime).getTime();
    });
    return file;
}




const getIndexFile = (req, res) => {
    res.render('index');
}

const getGalleryImages = (req, res) => {
    let GalleryPath = path.join(__dirname, '../', '../', 'GalleryImages');
    let files = sortFilesDirectoryByTime(GalleryPath);
    const filesContent = files.reduce((acc, file) => {
        if (acc.length >= 12) {
            return acc
        }
        const fileContent = fs.readdirSync(path.join(__dirname, '../', '../', 'GalleryImages', `${file}`));
        fileContent.forEach(eFile => {
            if (acc.length >= 12) return
            acc.push(`${file}/${eFile}`)
        })
        return acc;
    }, [])
    res.json({filesContent})
}

const getWholeGalleryPage = (req, res) => {
    let GalleryPath = path.join(__dirname, '../', '../', 'GalleryImages');
    let files = sortFilesDirectoryByTime(GalleryPath);
    const GalleryEvent = files.reduce((acc, file) => {
        const fileContent = fs.readdirSync(path.join(__dirname, '../', '../', 'GalleryImages', `${file}`));
        let fileObj = {name: file, Url: `${file}/${fileContent[0]}`};
        acc.push(fileObj);
        return acc;
    }, [])

    res.render('wholeGalleryPage', {GalleryEvent})
}

const getGalleryEventData = async (req, res) => {
    let {event: name} = req.params
    const gallery = await Gallery.findOne({name});
    if (gallery) {
        const fileContent = fs.readdirSync(path.join(__dirname, '../', '../', 'GalleryImages', `${name}`));
        const imageUrl = fileContent.map(file => `/${name}/${file}`)
        res.render('GalleryImageSlider', {imageUrl, name});
    } else {
        res.render("pageNotFound");
    }
}

const getJoinUsPage = (req, res) => {
    res.render('joinUs');
}

module.exports = {
    getIndexFile,
    getGalleryImages,
    getWholeGalleryPage,
    getGalleryEventData,
    getJoinUsPage
}