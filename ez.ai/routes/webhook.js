const express = require('express');
const router = express.Router();

//라인 연결 해야함
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const Client = require('@line/bot-sdk').Client;

//DB 연결
const ChatbotData = require('./models').ChatbotData;
const User = require('./models').User; 
// 라인봇 관련 코드
const config = {
    channelAccessToken: 'input token',
    channelSecret: 'input token'
};
const client = new line.Client(config);
  
  // webhook callback
router.post('/', line.middleware(config), (req, res) => {
    if (req.body.destination) {
      console.log("Destination User ID: " + req.body.destination);
     }
    // req.body.events should be an array of events
    if (!Array.isArray(req.body.events)) {
      return res.status(500).end();
    }
    // handle events separately
    Promise.all(req.body.events.map(handleEvent))
      .then(() => res.end())
      .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});
  

// callback function to handle a single event
function handleEvent(event) {
    switch (event.type) {
     case 'message':
       const message = event.message;
         if(message.type==='text')
           return handleText(message, event.replyToken, event.source);
    }
}
   


function logic(array,text){   //키워드 찾는 함수
    let contents= [];
    let flag = 0;
    array.forEach(element => {
        if(element.keyword===text) {
            console.log("키워드 찾음", element.keyword);
            contents = element.contents;
            flag=1;
        }
    });
        if(flag==1) return contents;
        else return 0;
}
function template_action(actions, msgObjects){ //템플릿 action 추가
   console.log(actions);
   let flag = 0;
   const len = msgObjects.length-1; //어짜피 템플릿들은 마지막에 위치함
   for(let i=0;i<actions.length;i++){
       if(actions[i].type === "uri"){
             	console.log("uri 통과");
		if(flag==0){
            	 msgObjects[len].template.actions= [{
            	 type: "uri",
            	 label: actions[i].label,
            	 uri: actions[i].uri,
	   	 }]
            flag=1;
            }
            else{
               msgObjects[len].template.actions.push({
  	         type: "uri",
                 label: actions[i].label,
                 uri: actions[i].uri,
  		});
            }

      }
      else if(actions[i].type === "postback"){
	     if(flag==0){
            	 msgObjects[len].template.actions=[{
            	 type: "postback",
            	 label: actions[i].label,
            	 data: "action=buy&itemid=111",
             	text: actions[i].data,
         	 }]
		flag=1;
	      }
	    else{
		msgObjects[len].template.actions.push({
			type: "postback",
                 	label: actions[i].label,
             		data: "action=buy&itemid=111",
               		text: actions[i].data,
		});


		}

	}
	}


  console.log(msgObjects[len].template);
}


async function handleText(message, replyToken, source) {
    const data = await ChatbotData.findAll({
     attributes:['data'],
    });
    const data1 = await JSON.parse(data[0].data);
    const contents = await logic(data1,message.text);
    if(contents){
     const msg_array =[];
     contents.forEach(element=> {
        const type_val = element.type;
        const text_val = element.content;
        //위치 정보
        const title_val = element.title;
        const latitude_val = Number(element.latitude);  //정확한 위도 정보가 아니면 error
        const longitude_val = Number(element.longtitude); //정확한 경도 정보가 아니면 error
        //이미지 정보
        const url_val = element.filepath;
        if(type_val==='text'){
           console.log("텍스트 타입 통과");
           msg_array.push({type: type_val, text: text_val});
           console.log(msg_array);
        }
        else if(element.type==='location'){
            console.log("위치 타입 통과");
            console.log(element);
            msg_array.push({type: type_val, title: title_val, address: "adress", latitude: latitude_val, longitude: longitude_val});
        }
       else if(type_val==='image'){
        console.log("이미지 타입 통과");
       // console.log(element);
	msg_array.push({type: "image", originalContentUrl: url_val, previewImageUrl: url_val });
        //originalContentUrl =>필수 정보
        //previewImageUrl => 필수 정보
       }
       else if(type_val==='video'){
        console.log("비디오 타입 통과");
	console.log(element);
	const v_url = element.filepath;
        msg_array.push({type: "video", originalContentUrl: v_url, previewImageUrl: v_url });
        //originalContentUrl => 필수 정보
        //previewImageUrl => 필수 정보
       }
       else if(type_val==='audio'){
        console.log("오디오 타입 통과");
	console.log(element);
        msg_array.push({type: "audio", originalContentUrl:url_val, duration:element.size});
        //originalContentUrl => 필수 정보
        //duration => 필수 정보 => Length of audio file (milliseconds)
       }
       else if(type_val==='btn_template'){ //템플릿 관련 코드
	console.log("버튼 템플릿 타입 통과");
        msg_array.push({type: "template", altText: "button template",
              template:
              {
              type: "buttons",
	      thumbnailImageUrl: element.content.thumbnailImageUrl,
              imageSize: element.content.imageSize,
              imageBackgroundColor: element.content.imageBackgroundColor,
              title: element.content.title, text: element.content.text
              }
  	 });
        template_action(element.content.actions, msg_array);
       }
});
    return client.replyMessage(replyToken, msg_array)
        .then(() => {
        console.log("출력통과");
        })
        .catch((err) => {
        console.log(err);
    });
 }
}





   
module.exports = router;
  
