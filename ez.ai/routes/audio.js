const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const router = express.Router();
const s3 = new AWS.S3();
const {getAudioDurationInSeconds} = require('get-audio-duration');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ezai', // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: 'public-read', // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 150 * 1024 * 1024 }, // 용량 제한
});

router.post('/', upload.single('audio'), (req, res) => {
  // 'audio'가 일치해야함 리액트랑
  //리액트에 주소 보내는 방식은 이야기 해야함 !
  
  console.log("오디오 전송 성공");
  
  getAudioDurationInSeconds(req.file.location).then((duration) => { //m4a 파일도 테스트해봐야함
   // res.json(duration*1000); //밀리세컨드로 보내야함
    console.log('듀레이션 변환 성공');
    console.log(duration*1000);
    req.file.size = duration * 1000;
    console.log(req.file);
    res.json(req.file); //size에 듀레이션이 적혀있음
  });
});

module.exports = router;
