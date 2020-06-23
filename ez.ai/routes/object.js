const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
router.get('/', async(req,res)=>{
    console.log("오브젝트 통과");
    const file_name = await("./objects/" + req.query.id);
    fs.readFile(file_name, function(err, data) {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(data);
        res.end();
    });
});

module.exports = router;