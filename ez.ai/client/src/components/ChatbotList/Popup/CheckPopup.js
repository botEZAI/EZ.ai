import React from "react";
import "./Popup.css";

const CheckPopup = ({
  isOpen,
  close,
  next,
  finish,
  botName,
  botDesc,
}) => {
  const undoToTokenInput = () => {
    next("first");
  };
  return (
    <React.Fragment>
      {isOpen ? (
        <React.Fragment>
          <div className="popup-overlay" onClick={close}></div>
          <div className="popup">
            <div className ="popup-check-title">
              챗봇을 만드시겠습니까?
            </div>
            <div className="popup-check-values">
              <div className="popup-check-value">
                <div className="popup-check-name">
                  봇 이름 : <span>{botName.name}</span>
                </div>
                <div className="popup-check-desc">
                  설명 : <span>{botDesc.desc}</span>
                </div>
              </div>
            </div>
            <div className="popup-button-wrap">
              <button onClick={undoToTokenInput}>이전</button>
              <button onClick={finish}>생성</button>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default CheckPopup;
