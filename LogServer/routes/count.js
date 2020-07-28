//로그 숫자를 세는 라우터
const express = require('express');
const router = express.Router();
//DB 가져옴
const ChatbotData = require('../models').ChatbotData;
const History = require('../models').History;
const User = require('../models').User;
const fs = require('fs');

const keyword_array = [{keyword : "Welcome", count:1}];
function ingestKeyword(){  //DB에서 데이터를 가져옴
    const data = ChatbotData.findAll({ 
        attributes:['data'],
    });
   return data;
}

function countKeyword(input_keyword){
    for(let i=0;i<keyword_array.length;i++){
        if(keyword_array[i].keyword===input_keyword){
            keyword_array[i].count++;
            return;
        }
    }
    keyword_array.push({keyword : input_keyword, count:1});
}


async function findKeyword(){ //키워드들을 가져옴
    const JsonData = await ingestKeyword();
    //console.log(JsonData);
    JsonData.forEach(element => {
        const parseData = JSON.parse(element.data);
        parseData.forEach(element2 => {
          // console.log(element2.keyword);
            countKeyword(element2.keyword);
        });
    });
}
function writeFile(path,data){ 
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        console.log("파일 생성 완료");
      } catch (err) {
        console.error(err);
      }
}


router.get('/', async (req, res, next) => {
    await findKeyword();
    await writeFile('./data/123.json',keyword_array);
    console.log(keyword_array);

});


module.exports = router;
