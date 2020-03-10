const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// multer 처리부분
const upload = multer({
    storage: multer.diskStorage({
        destination(req,file, cb){ //경로 설정 
            cb(null, 'objects/');
        },
        filename(req, file, cb){ // 파일 이름 설정
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});


router.post('/', upload.single('image'), (req, res) =>{  // 'image'가 일치해야함 리액트랑 
    //리액트에 주소 보내는 방식은 이야기 해야함 !
    console.log("이미지 전송 성공");
    res.json(req.file);
});
  
module.exports = router;