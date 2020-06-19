import React from 'react';

import imgLogin from "./Guide/TelegramToken/login.jpg"
import imgCode from './Guide/TelegramToken/code.jpg';
import imgMessage from "./Guide/TelegramToken/code-message.jpg"
import imgBotFather from "./Guide/TelegramToken/Botfather.png"
import imgStart from "./Guide/TelegramToken/start.png"
import imgNewBot from "./Guide/TelegramToken/newbot.png"
import imgFailNaming from "./Guide/TelegramToken/failnaming.png"
import imgToken from "./Guide/TelegramToken/token.png"
import imgTestBot from "./Guide/TelegramToken/testbot.png"
import imgChat from "./Guide/TelegramToken/chat.png"
import imgAddress from "./Guide/TelegramToken/address.png"

const Guide = () => {
    return (
        <div>
           <div className="post-header">
             <h1 class="post-title-main">가이드라인</h1>
           </div>
           <div className="post-content">
             <h2>Telegram 토큰 발급 받는 방법</h2>
             <p>Telegram 채널 연계 설정을 하려면 다음이 필요합니다.</p>
             <ol>
               <li>Telegram 계정</li>
             </ol>
             <p>*텔레그램은 모든 플랫폼에서 지원합니다.</p>
             <h3>어플리케이션 버전</h3>
             <table>
               <thead>
                  <tr>
                    <th>버전</th>
                    <th>링크</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                    <td>안드로이드</td>
                    <td>
                      <a href="https://play.google.com/store/apps/details?id=org.telegram.messenger">Android-version</a>
                    </td>
                  </tr>
                  <tr>
                    <td>IOS</td>
                    <td>
                      <a href="https://apps.apple.com/app/telegram-messenger/id686449807">IOS-version</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      MS
                    </td>
                    <td>
                      <a href="https://www.microsoft.com/ko-kr/p/telegram-messenger/9wzdncrdzhs0?rtc=1&activetab=pivot:overviewtab">MS-version</a>
                    </td>                  
                  </tr>
               </tbody>
             </table>
             <h3>웹 버전</h3>
             <table>
               <thead>
                  <tr>
                    <th>버전</th>
                    <th>링크</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                    <td>웹(Web))</td>
                    <td>
                      <a href="https://web.telegram.org/#/login">Web-version</a>
                    </td>
                  </tr>
                  <tr>
                    <td>맥(Mac)</td>
                    <td>
                      <a href="https://macos.telegram.org">MAC-version</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      리눅스,윈도우
                    </td>
                    <td>
                      <a href="https://desktop.telegram.org">Linux,Window-version</a>
                    </td>                  
                  </tr>
               </tbody>
             </table>
             <h3>텔레그램 봇 만들기</h3>
             <p>* 아래의 과정은 어떤 플랫폼을 사용해도 동일한 방법으로 진행합니다</p>
             <ol>
               <li>1. 브라우저에서
                 <span className="link">
                   <a href="https://web.telegram.org">Telegram Web-version</a>
                  </span>
                  에 접속한 후 로그인합니다.
                  <figure>
                    <img src={imgLogin} />
                  </figure>
                  <ul>- 지역번호로 인증 번호를 받기 위해 국가를 설정하고, 핸드폰 번호를 입력합니다.</ul>
                  <ul>- 엔터를 치거나 NEXT 버튼을 누르면 텔레그램에서 인증 코드를 생성하고 입력된 전화 번호에 메시지 형태로 전달합니다.</ul>
               </li>
               <li>2. 인증 번호를 입력 칸에 입력하고 NEXT 버튼을 클릭하면 로그인 완료
                 <figure>
                   <img src={imgMessage} />
                   <img src={imgCode} />
                 </figure>
               </li>
               <li>3. Telegram BotFather 로 이동 하거나 검색 창에 ‘BotFather’을 검색하세요.
                 <figure>
                   <img src={imgBotFather} />
                 </figure>
               </li>
               <li>4. 웹 인터페이스에서 시작 단추를 클릭하거나 /start 를 입력
                 <figure>
                   <img src={imgStart} />
                 </figure>
               </li>
               <li>5. 봇을 생성합니다
                 <ul>5 - 1. 채팅 창에 /newbot 을 입력하십시오
                   <figure>
                     <img src={imgNewBot} />
                   </figure>
                 </ul>
                 <ul>5 - 2. 봇 이름을 정합니다.
                   <figure>
                     <img src={imgFailNaming} />
                   </figure>
                   <ul>- 봇 이름은 반드시, ‘bot’ 으로 끝나야 합니다. (ex. tetris_bot) </ul>
                   <ul>botfather을 다시 호출해서 나의 토큰 정보를 다시 확인 할 수 있으니 이 점 참고 바랍니다.</ul>
                 </ul>
               </li>
               <li>6. BotFather(봇 아버지)이 생성해 준 액세스 토큰을 기록해 놓습니다.
                 <figure>
                   <img src={imgToken} />
                 </figure>
                 <ul>‘HTTP API: ‘ 다음에 오는 코드가 ‘발급된 토큰 주소’ 입니다.</ul>
               </li>
               <li>7. 생성된 봇 확인하기
                 <ul> - 생성한 봇의 이름을 검색 창에 검색하면 방금 만든 봇이 검색되는 것을 확인 할 수 있습니다.</ul>
                 <figure>
                   <img src={imgTestBot}/>
                 </figure>
                 <ul> - START 버튼 클릭 혹은 /start  를 입력한 다음 아무 메시지를 보내면 봇 활성화됩니다.</ul>
                 <figure>
                   <img src={imgChat}></img>
                 </figure>
               </li>
               <li>8. 브라우저 주소 창으로 이동하여 다음 아래와 같은 메시지를 입력합니다.
                 <ul>https://api.telegram.org/bot발급받은토큰주소/getUpdates</ul>
                 <figure>
                   <img src={imgAddress}/>
                 </figure>
                 <ul>{"{ “ok”:true, “result”:[ ] }"}</ul>
                 <ul>위와 같은 메시지가 출력 되면 봇 생성이 성공한 것입니다.</ul>
               </li>
            </ol>
           </div>
        </div>
    );
};

export default Guide;