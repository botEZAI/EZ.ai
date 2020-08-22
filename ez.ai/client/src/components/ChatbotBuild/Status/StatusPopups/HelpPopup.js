import React, { useState } from 'react';
import './HelpPopup.css';

const HelpPopup = ({ currentInput, clickedMainInput }) => {
  const [helpActive, setHelpActive] = useState("");

  return(
    <div title="요소 도움말">
      {currentInput ? (
        currentInput.type === "text" || 
        clickedMainInput.type === "text" ? (
            <>
              <div 
                className={"help text-help " + (helpActive === "text"  ? 'active' : '')} 
                onClick={(e) => {helpActive !== "text" ? setHelpActive("text")
                                                      : setHelpActive("")}}   
              >
                ?
              </div>
              {helpActive === "text" ?
                <div className="help-content help-text-content" onClick={()=>setHelpActive("")}>
                  <span>텍스트</span> 메세지를 보내려면, <br />아래의 입력칸에 텍스트를 입력하세요.
                </div>
              :
                null
              }
            </>
        ) : currentInput.type === "image" ||
          clickedMainInput.type === "image" ? (
            <>
              <div
                className={"help image-help " + (helpActive === "image" ? 'active' : '')}
                onClick={(e) => {helpActive !== "image" ? setHelpActive("image") 
                                                        : setHelpActive("")}}  
              >
                ?
              </div>
              {helpActive === "image" ?
                <div className="help-content help-image-content" onClick={()=>setHelpActive("")}>
                  <span>이미지</span> 메세지를 보내는 방법은 두가지가 있습니다. <br />
                  외부 이미지의 URL 주소를 작성해 첨부하는 방법과, <br /> 로컬 이미지를 업로드 해 첨부하는 방법이 있습니다.
                </div>
              :
                null
              }
            </>
        ) : currentInput.type === "video" ||
          clickedMainInput.type === "video" ? (
            <>
              <div
                className={"help video-help " + (helpActive === "video" ? 'active' : '')}
                onClick={(e) => {helpActive !== "video" ? setHelpActive("video")
                                                        : setHelpActive("")}}  
              >
                ?
              </div>
              {helpActive === "video" ?
                <div className="help-content help-video-content" onClick={()=>setHelpActive("")}>
                  <span>동영상</span>을 보내려면, <br /> 아래 적혀있는 올바른 동영상 형식의 파일을 첨부하세요.
                </div>
              :
                null
              }
            </>
        ) : currentInput.type === "audio" ||
          clickedMainInput.type === "audio" ? (
            <>
              <div
                className={"help audio-help " + (helpActive === "audio" ? 'active' : '')}
                onClick={(e) => {helpActive !== "audio" ? setHelpActive("audio")
                                                        : setHelpActive("")}}  
              >
                ?
              </div>
              {helpActive === "audio" ?
                <div className="help-content help-audio-content" onClick={()=>setHelpActive("")}>
                  <span>오디오</span>를 보내려면, <br /> 아래 적혀있는 올바른 오디오 형식의 파일을 첨부하세요.
                </div>
              :
                null
              }
            </>
        ) : currentInput.type === "location" ||
          clickedMainInput.type === "location" ? (
            <>
              <div 
                className={"help location-help " + (helpActive === "location" ? 'active' : '')}
                onClick={(e) => {helpActive !== "location" ? setHelpActive("location")
                                                          : setHelpActive("")}}  
              >
                ?
              </div>
              {helpActive === "location" ?
                <div className="help-content help-location-content" onClick={()=>setHelpActive("")}>
                  사용자에게 <span>위치</span> 정보를 전송합니다.<br/> 아래 입력칸에 원하는 장소명을 입력한 뒤,<br/> 해당 장소의 정확한 주소를 선택하세요.<br/> 
                  자동으로 지도에서 해당 위치가 지정됩니다.
                </div>
              :
                null
              }
            </>
        ) : currentInput.type === "list" ||
          clickedMainInput.type === "list" ? (
            <>
            <div 
              className={"help list-help " + (helpActive === "list" ? 'active' : '')}
              onClick={(e) => {helpActive !== "list" ? setHelpActive("list")
                                                     : setHelpActive("")}}  
            >
              ?
            </div>
            {helpActive === "list" ?
              <div className="help-content help-list-content" onClick={()=>setHelpActive("")}>
                <span>고정 메뉴</span>는 다른 키워드를 호출하는 가장 쉬운 방법입니다. <br/>
                하단 키보드 수정 영역에서 <br/>연동할 키워드와 버튼 이름을 지정하세요.<br/>
                연동 가능한 키워드의 개수는 최대 6개입니다.<br/>
                <span>한 키워드 당, 하나의 고정메뉴만 생성할 수 있습니다.</span>
              </div>
            :
              null
            }
            </>
        ) : currentInput.type === "btn_template" ||
          clickedMainInput.type === "btn_template" ? (
            <>
            <div
              className={"help buttons-help " + (helpActive === "btn_template" ? 'active' : '')}
              onClick={(e) => {helpActive !== "btn_template" ? setHelpActive("btn_template")
                                                             : setHelpActive("")}}  
            >
              ?
            </div>
            {helpActive === "btn_template" ?
              <div className="help-content help-buttons-content" onClick={()=>setHelpActive("")}>
                <span>버튼 리스트</span>는 이미지, 텍스트, 여러 액션 버튼을 <br />
                하나의 템플릿으로 보낼 수 있는 요소입니다.<br />
                이미지와 타이틀은 생략가능하나, <br />텍스트는 필수 요소입니다.<br/>
                연동 가능한 키워드의 개수는 최대 4개입니다.<br/>
                <span>한 키워드 당 하나의 버튼 템플릿만 생성할 수 있습니다.</span>
              </div>
            :
              null
            }
            </>
        ) : null
      ) : 
          <div
            className="help"
          >
            ?
          </div>
      }
    </div>
  );
};


export default HelpPopup;