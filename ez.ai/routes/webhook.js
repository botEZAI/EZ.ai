// 라인봇 관련 코드
const config = {
    channelAccessToken: '/cmTlUJaNPwyfXD5s/tcNsyuN/+WB8LMHPpWm/gyrBnG17fRduIFjweKN0n72ZKcQ3ysAlCBy0PDnBS1xI1rtIKOPbjYxJrHSSHXDM17BkJQamNJXe8j5+tPn/M5ZCyc/ZuOK7Cg9Z8sfx95nxicvAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'eea6a47cb2f86fd0df9e280b31b0a93c'
};
const client = new line.Client(config);
  
  // webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
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
   

   

  