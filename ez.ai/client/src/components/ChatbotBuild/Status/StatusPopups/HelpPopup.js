import React from 'react';
import './HelpPopup.css';

const HelpPopup = ({ currentInput, clickedMainInput }) => {

  return(
    <>
      {currentInput ? (
        currentInput.type === "text" || 
        clickedMainInput.type === "text" ? (
          <div
            data-tooltip-text={"일반 텍스트 메시지입니다. \n사용자에게 전달할 텍스트 메시지를 작성해주세요 "} 
            className="help text-help"
          >
            ?
          </div>
        ) : currentInput.type === "image" ||
          clickedMainInput.type === "image" ? (
            <div
              data-tooltip-text="사용자에게 이미지를 전송합니다. 원본 이미지의 URL을 입력하거나 로컬 파일에 저장된 이미지를 업로드하세요.
              채팅에는 이미지 미리보기가 표시됩니다." 
              className="help image-help"
            >
              ?
            </div>
        ) : currentInput.type === "video" ||
          clickedMainInput.type === "video" ? (
            <div
              data-tooltip-text="사용자에게 동영상을 전송합니다. 로컬 비디오 파일을 업로드하세요. 채팅에 동영상이 표시됩니다." 
              className="help video-help"
            >
                ?
            </div>
        ) : currentInput.type === "audio" ||
          clickedMainInput.type === "audio" ? (
            <div
              data-tooltip-text="사용자에게 오디오를 전송합니다. 로컬 오디오 파일을 업로드하세요. 채팅에 오디오 파일이 표시됩니다." 
              className="help audio-help"
            >
                ?
            </div>
        ) : currentInput.type === "location" ||
          clickedMainInput.type === "location" ? (
            <div 
              data-tooltip-text="사용자에게 맵 정보를 전송합니다. 아래 입력칸에 원하는 장소의 이름을 작성한 뒤, 지역의 주소를 선택하세요. 
              경도와 위도 정보가 자동으로 포함됩니다."
              className="help location-help"
            >
              ?
            </div>
        ) : currentInput.type === "list" ||
          clickedMainInput.type === "list" ? (
            <div 
              data-tooltip-text="다른 키워드로 이동할 때 사용하는 [고정 메뉴]입니다. 연동 가능한 키워드의 개수는 최대 6개입니다. 
              하단 '키보드 수정' 영역에서 현재 생성된 키워드들 중 연동할 키워드를 지정하세요. 
              한 키워드 당 하나의 [고정메뉴]만 생성할 수 있습니다."
              className="help list-help"
            >
              ?
            </div>
        ) : currentInput.type === "btn_template" ||
          clickedMainInput.type === "btn_template" ? (
            <div
              data-tooltip-text="다른 키워드로 이동할 때 사용하는 [버튼 템플릿]입니다. 연동 가능한 키워드의 개수는 최대 4개입니다.
              이미지와 타이틀은 생략가능하나, 텍스트는 반드시 작성하세요. 좌측 상단의 네모를 눌러 이미지의 배경 색상을 변경할 수 있습니다.
              한 키워드 당 하나의 [버튼 템플릿]만 생성할 수 있습니다." 
              className="help buttons-help"
            >
              ?
            </div>
        ) : null
      ) : 
          <div
            data-tooltip-text="상단의 탭에서 생성할 요소를 선택해주세요"
            className="help"
          >
            ?
          </div>
      }
    </>
  );
};


export default HelpPopup;