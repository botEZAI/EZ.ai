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
    limits: {fileSize: 5 * 1024 * 1024},//limits 용량 논의 필요 
});


router.post('/', upload.single('audio'), (req, res) =>{  // 'audio'가 일치해야함 리액트랑 

    //리액트에 주소 보내는 방식은 이야기 해야함 !
    console.log("파일 전송 성공");
    console.log(req.file);
});
  
module.exports = router;