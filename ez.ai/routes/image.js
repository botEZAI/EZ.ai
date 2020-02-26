const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const upload = multer({
    storage: multer.diskStorage({
        destination(req,file, cb){
            cb(null, 'objects/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});


router.post('/', upload.single('image'), (req, res) =>{
    console.log("파일 전송 성공");
    console.log(req.file);
});
  
module.exports = router;