import React from "react";
import "./Popup.css";

const CheckPopup = ({
  isOpen,
  close,
  next,
  finish
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
            챗봇을 만드시겠습니까?
            <div className="popup-button-wrap">
              <button onClick={undoToTokenInput}>이전</button>
              <button onClick={finish}>완료</button>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default CheckPopup;
