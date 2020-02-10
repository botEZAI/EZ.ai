var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
    console.log("받아지는 것 확인");
    const content= req.body.keywordObject[0].contents;
    console.log(content);
});
module.exports = router;