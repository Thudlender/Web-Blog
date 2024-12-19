const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:"./uploads/",
    filename: (req,file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

//Init Upload
const upload = multer({
    storage:storage,
    limits:{ fileSize: 1000000 }, // 1Mb
    fileFilter:(req, file, cb)=>{
        checkFileType(file, cb) // Check file ext
    },
}).single('file'); // input name

function checkFileType (file, cb){
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Image Only!");
    };
};

module.exports = { upload };
