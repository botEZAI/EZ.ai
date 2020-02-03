# 페이스북 메신저 챗봇 API 

#### [웰컴 메세지]

![웰컴 메세지](.\images\웰컴 메세지.JPG)

: [웰컴 메세지](https://developers.facebook.com/docs/messenger-platform/discovery/welcome-screen)

<br>

-----

#### [단체 메세지]

: [링크](https://developers.facebook.com/docs/messenger-platform/send-messages/broadcast-messages/?translation)

<br>

------

#### [고정 메뉴]

![고정 메뉴](.\images\고정 메뉴.JPG)

: 대화 내에 사용자 인터페이스 요소를 항상 표시할 수 있는 기능. 항상 대화에 표시

: [링크](https://developers.facebook.com/docs/messenger-platform/send-messages/persistent-menu/?translation)

<br>

-----

#### [대화 구성 요소]

: [페이지로 보기](https://developers.facebook.com/docs/messenger-platform/introduction/conversation-components/?translation)

1. **기본 텍스트 메세지**

   ![텍스트 메세지](.\images\텍스트.JPG)

   ```json
   curl -X POST -H "Content-Type: application/json" -d '{
     "recipient":{
       "id":"<PSID>"
     },
     "message":{
       "text":"hello, world!"
     }
   }' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
   ```

   : 요청 본문에 message.text 설정해 post 요청 보내기 API에 제출

   : [앱 기본 NLP 기능 제공](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/?translation)

   <br>

2. **첨부 파일 포함 메세지 (오디오, 동영상, 이미지 ,파일)**

   : [링크](https://developers.facebook.com/docs/messenger-platform/send-messages/?translation#attachment_reuse)

   : 예시의 message.type(image, audio, video, file) 따라 설정됨

   - 첨부 파일 첨부하는 방법

     - URL

       ```json
       curl -X POST -H "Content-Type: application/json" -d '{
         "recipient":{ 
           "id":"1254459154682919"
         },
         "message":{
           "attachment":{
             "type":"image", 
             "payload":{
               "url":"http://www.messenger-rocks.com/image.jpg", 
               "is_reusable":true
             }
           }
         }
       }' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
       ```

     - 파일

       ```json
       curl  \
         -F 'recipient={"id":"<PSID>"}' \
         -F 'message={"attachment":{"type":"<ASSET_TYPE>", "payload":{"is_reusable"=true}}}' \
         -F 'filedata=@/tmp/shirt.png;type=image/png' \
         "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
       ```

       - recipient : 메시지 받는 사람을 식별하는 JSON 개체입니다.
       - message : 메시지를 설명하는 JSON 개체입니다. 자산 유형과 페이로드를 포함합니다. 페이로드는 비어 있거나 [`is_reusable`](https://developers.facebook.com/docs/messenger-platform/send-messages/?translation#attachment_reuse) 속성을 설정합니다.
       - filedata : 파일 시스템에서 자산의 위치와 MIME 유형입니다.

     - attachment_id (저장된 자산 첨부)

       : 이렇게 하면 필요할때마다 자산 업로드 안하고 자산 재사용 가능 ([자산 저장](https://developers.facebook.com/docs/messenger-platform/send-messages/saving-assets/))

       ```json
       curl -X POST -H "Content-Type: application/json" -d '{
         "recipient":{
           "id":"1254459154682919"
         },
         "message":{
           "attachment":{
             "type":"image", 
             "payload":{
               "attachment_id": "1745504518999123"
             }
           }
         }
       }' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
       ```

     <br>

3. **메시지 템플릿**

   ![일반 템플릿](.\images\template\일반 템플릿.JPG)

   : [링크](https://developers.facebook.com/docs/messenger-platform/send-messages/templates/?translation)

   : 구조화된 메세지 유형 (선택 형태)

   ```json
   {
     "recipient":{
       "id":"<PSID>"
     },
     "message":{
       "attachment":{
         "type":"template",
         "payload":{
           "template_type":"<TEMPLATE_TYPE>",
           ...
         }
       }
     }
   }
   ```

   - **템플릿 가로 슬라이드**

     ![텍스트 메세지](.\images\template\템플릿 가로 슬라이드.JPG)

     <br>

   - **일반 템플릿**

     : 제목, 부제, 이미지 및 최대 세개의 버튼이 포함된 구조화된 간단한 메세지

     <br>

   - **리스크 템플릿**

     ![1580614927566](.\images\template\리스트 템플릿.jpg)

     : 구조화된 2~4개 항목의 리스트이며 하단에 글로벌 버튼 표시 가능

     : 각 항목에는 썸네일 이미지, 제목, 무제 및 버튼 하나가 포함 가능

     <br>

   - **버튼 템플릿**

     ![1580615051548](.\images\template\버튼 템플릿.jpg)

     : 문자메세지에 최대 세개의 버튼을 첨부해서 보낸다.

     : 메세지를 받는 사람에게 질문에 대한 미리 결정된 응답, 취할 행동 등 선택할 옵션을 제공하는데 유용

     <br>

   - **오픈 그래프 템플릿**

     ![1580615133071](.\images\template\오픈 그래프 템플릿.jpg)

     : 구조화된 메세지를 오픈 그래프 URL 및 버튼과 함께 보낼 수 있다. (현재는 노래만 공유 가능)

     : 노래는 말풍선에 표시되어 메세지를 받는 사람이 앨범 사진을 보고 노래를 미리 들을 수 있다.

     <br>

   - **영수증 템플릿**

     ![1580615211459](.\images\template\영수증 템플릿.jpg)

     : 주문 확인을 구조화된 메세지로 보낼 수 있다.

     : 템플릿에는 주문 요약, 결제 상세 정보 및 배송 정보를 포함할 수 있다.

     <br>

   - 항공사 템플릿

     ![1580615272875](.\images\template\탑승권 템플릿.jpg)

     : 하나 이상의 항공편과 한 명 이상의 승객을 위한 탑승권을 보낼 수 있도록 제작

     : 템플릿에 포함된 탑승권 보기 버튼을 누르면 전체 탑승권으로 확대

     <br>

   - **미디어 템플릿**

     ![1580615340237](.\images\template\미디어 템플릿.jpg)

     

     : 선택적 버튼을 통해 이미지, GIF, 동영상을 구조화된 메세지로 보낼 수 있다.

     : 대화내에서 해당 컨텐츠 재생된다.

   <br>

4. **빠른 답장**

   ![빠른 답장](.\images\빠른 답장.JPG)

   : 작성 도구 위에 바로 나타나는 빠른 답장 (버튼)

   : [링크](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)

   <br>

5. 보낸 사람 액션

   : 프로그래밍 방식으로 기본 Messenger 입력 상태를 관리하고 대화 내 수신 확인 지표를 읽을 수 있는 기능을 통해 이러한 기대치를 설정하도록 도와주는 중요한 도구.

   (메시지를 처리할 때 읽은 영수증 표시 도구를 설정하여 봇을 사용하는 사람이 자신이 보낸 메시지가 확인되었음을 알 수 있도록 하고, 입력 표시 도구를 설정하여 답장이 작성되고 있음을 표시)

   <br>

6. **버튼**

   https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation

   - [URL 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#url)

     ![URL](./images/buttons/URL.jpg)

     : Messenger WebView에 웹페이지가 열린다.

   - [포스트백 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#postback)

     : 사용자가 버튼을 누를 때 임의의 액션을 취할 수 있다.

   - [공유하기 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#share)

     : 메세지를 받는 사람이 개발자가 보낸 메세지의 콘텐츠를 Messenger에서 다른 사람과 공유 할 수 있다.

   - [구매 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#buy)

     : 결제 대화 상자가 열려 메세지를 받는 사람이 결제 수단, 배송 주소 및 기타 상세 정보를 선택할 수 있다.

   - [전화 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#call)

     : 누르면 전화번호로 전화를 건다

   - [로그인 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#login)

     : 계정 연결 플로에서 사용

     : 메세지 받는 사람의 메신저 ID를 개발자 사이트의 해당 계정과 연결 할 수 있다.

   - [로그아웃 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#logout)

     : 위와 동. 계정 연결 해제위해 사용

   - [게임 플레이 버튼](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#game_play)

     : 연결된 인스턴트 게임이 실행

   - [모범 사례](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons/?translation#best_practices)





자산 저장부터 정리