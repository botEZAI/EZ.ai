const express = require('express');
const multer = require('multer');
const router = express.Router();




const upload = multer({
    storage: multer.diskStorage({
        destination(req,file, cb){
            cb(null, 'objects/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Data().valueOf() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});





router.post('/', upload,single('img'), (req, res) =>{
    console.log(req.file);
});
  
module.exports = router;