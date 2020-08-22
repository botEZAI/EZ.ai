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
                  사용자에게 동영상을 전송합니다.<br/> 로컬 비디오 파일을 업로드하세요. <br/>채팅에 동영상이 표시됩니다.
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
                  사용자에게 오디오를 전송합니다.<br/> 로컬 오디오 파일을 업로드하세요.<br/> 채팅에 오디오 파일이 표시됩니다.
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
                  사용자에게 맵 정보를 전송합니다.<br/> 아래 입력칸에 장소명을 입력한 뒤,<br/> 지역의 주소를 선택하세요.<br/> 
                  오른쪽 화면에 <br/>지도 정보가 표시됩니다.
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
                다른 키워드로 이동할 때 사용하는 <br/>[고정 메뉴] 입니다.<br/> 연동 가능한 키워드의 개수는 최대 6개입니다.<br/> 
            하단 키보드 수정 영역에서 <br/>연동할 키워드의 개수와 키워드 명을 지정하세요.<br/> 
            한 키워드 당, 하나의 [고정메뉴]만 생성할 수 있습니다.
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
                다른 키워드로 이동할 때 사용하는 <br/>[버튼 템플릿] 입니다.<br/> 연동 가능한 키워드의 개수는 최대 4개입니다.<br/>
            이미지와 타이틀은 생략가능하나, <br/>텍스트는 반드시 작성하세요.<br/> 좌측 상단의 네모를 눌러 첨부한 이미지의<br/> 배경 색상을 변경할 수 있습니다.<br/>
            한 키워드 당 하나의 [버튼 템플릿]만 생성할 수 있습니다.
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