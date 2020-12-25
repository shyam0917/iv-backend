// var multer = require('multer');
const config = require('../config');
// var Storage = config.multer;


function uploadImage(req, res, date) {

    // return new Promise((resolve, reject) => {
    //     var upload = multer({ storage: Storage }).single("image");
    //     upload(req, res, function (err) {
    //         console.log("testing", req.file)
    //         if (err) {
    //             reject({ msg: "Error occured", "err": err, });
    //         } else {
    //             console.log("ff", req.file);
    //             resolve({ msg: "Successfully uploaded", imagePath: path.join(",") });
    //         }

    //     });
    // });
}


module.exports = uploadImage;