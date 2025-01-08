const multer = require("multer");
const path = require("path");

const firebaseConfig = require("../configs/firebase.config");
// console.log(firebaseConfig);
const {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");

//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

//Set Storage engine
// const storage = multer.diskStorage({
//     destination:"./uploads/",
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });

//Init Upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits:{ fileSize: 1000000 }, //limit 1Mb
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

//upload to firebase storage
async function uploadToFirebase(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }
    console.log(req.file);

    //save location
    const storageRef = ref(firebaseStorage, `uploads/${req.file.originalname}`);
    //file type
    const metadata = {
        contentType: req.file.mimetype,
    };
    try {
        //uploading...
        const snapshot = await uploadBytesResumable(
            storageRef,
            req.file.buffer,
            metadata
        );
        // get url from firebase
        req.file.firebaseUrl = await getDownloadURL (snapshot.ref);
        console.log(req.file.firebaseUrl);

        next();
    }   catch (error) {
        res.status(500).json({
            message :
            error.message || "Something went wrong while uploading to firebase",
        });
    }
}

module.exports = { upload, uploadToFirebase };
