const express = require("express");
const multer = require("multer");
const multerS3 = require('multer-s3');
const fs = require('fs'); const path = require('path'); 
const AWS = require('aws-sdk');
const router = express.Router();

// multer 처리부분
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region : 'ap-northeast-2'
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: "ezai", // 버킷 이름
      contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
      acl: 'public-read', // 클라이언트에서 자유롭게 가용하기 위함
      key: (req, file, cb) => {
          console.log(file);
          cb(null, file.originalname)
      },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 용량 제한
});
