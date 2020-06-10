const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const router = express.Router();
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ezai", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 150 * 1024 * 1024 }, // 용량 제한
});

router.post("/", upload.single("audio"), (req, res) => {
  // 'audio'가 일치해야함 리액트랑

  //리액트에 주소 보내는 방식은 이야기 해야함 !
  console.log("오디오 전송 성공");
  console.log(req.file.location);
  res.json(req.file);
});

module.exports = router;
