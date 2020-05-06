import React, { useCallback } from "react";
import './SidePreview.css';
import { useInput } from "../../../Register.js";
import Clock from 'react-live-clock';

const SidePreview = (props) => {

  var dayList = ['일', '월', '화', '수', '목', '금', '토']
  var today = new Date();
  var dd = dayList[today.getDay()]
  var theHours = today.getHours();
  var noon = "오전"
  if(theHours > 12){
    theHours = theHours - 12;
    noon = "오후"
  }

  const [message, onChangeMessage] = useInput("");
  const onSubmitPreview = useCallback(
    (e) => {
      e.preventDefault();
      //
    },[message]
  );
  return(
    <>
      {props.activePlatformTab == "platform-kakao" ?
        <div className="preview-container side-kakao">
          <div className="preview-header">

          </div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock format={'YYYY년 MM월 DD일 '+dd+'요일'} ticking={true} timezone={'Asia/Seoul'} />
            </div>
          </div>
          <div className="preview-footer">
           <div class="preview-input input-kakao">
              <input type="text" placeholder="Say Something"/>
            </div>
          </div>
        </div>
        : null
      }
      {props.activePlatformTab == "platform-line" ?
        <div className="preview-container side-line">
          <div className="preview-header">

          </div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock format={'MM월 DD일 ('+dd+')'} ticking={true} timezone={'Asia/Seoul'} />
            </div>
          </div>
          <div className="preview-footer">
            <div class="preview-input input-line">
              <input type="text" placeholder="Say Something"/>
            </div>
          </div>
        </div>
        : null
      }
      {props.activePlatformTab == "platform-facebook" ?
        <div className="preview-container side-facebook">
          <div className="preview-header">

          </div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock format={noon+' '+theHours+':mm'} ticking={true} timezone={'Asia/Seoul'} />
            </div>
          </div>
          <div className="preview-footer">
            <div class="preview-input input-facebook">
              <input type="text" placeholder="Say Something"/>
            </div>
          </div>
        </div>
        : null
      }
      {props.activePlatformTab == "platform-telegram" ?
        <div className="preview-container side-telegram">
          <div className="preview-header">

          </div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock format={'MM월 DD일'} ticking={true} timezone={'Asia/Seoul'} />
            </div>
          </div>
          <div className="preview-footer">
            <div class="preview-input input-telegram">
              <form onSubmit={onSubmitPreview}>
                <input type="text" 
                  placeholder="Say Something" 
                  onChange={onChangeMessage}
                />
              </form>
            </div>
            
          </div>
        </div>
        : null
      }
    </>
  );
};

export default SidePreview;