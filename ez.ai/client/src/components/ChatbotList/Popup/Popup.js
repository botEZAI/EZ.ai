import React, { useState } from "react";
import "./Popup.css";
import produce from "immer";

const Popup = ({
  isOpen,
  close,
  next,
  botName,
  botDesc,
  botConnect,
  setBotName,
  setBotDesc,
  setBotConnect,
  platformInfo,
  setPlatformInfo,
  finish,
}) => {
  const [checkError, setCheckError] = useState(false);
  const [selectedSns, setSelectedSns] = useState([
    { name: "line", color: false },
    { name: "facebook", color: false },
    { name: "telegram", color: false },
    { name: "kakao", color: false },
  ]);

  const onChangeBotName = (e) => {
    e.preventDefault();
    setBotName({ name: e.target.value });
  };
  const onChangeBotDesc = (e) => {
    e.preventDefault();
    setBotDesc({ desc: e.target.value });
  };
  const onChangeBotSns = (e) => {
    //한 챗봇 당 하나의 소셜 계정만 연동
    console.log(e.target.value, "line" === e.target.value ? "true" : null);
    setSelectedSns(
      selectedSns.map((i) =>
        i.name === e.target.value
          ? { ...i, color: true }
          : { ...i, color: false }
      )
    ); /* 외안덴데 */
    console.log(selectedSns);
    setCheckError(false);
    setBotConnect({ sns: e.target.value });
  };

  const isBotProfileEmpty = () => {
    // 봇 정보 미 입력시 alert
    if (botName.name === "" && botDesc.desc === "") {
      alert("봇 정보를 기입해주세요.");
    } else if (botName.name === "") {
      alert("봇 이름을 입력해주세요.");
    } else if (botDesc.desc === "") {
      alert("봇 설명을 입력해주세요.");
    } /*else if (botConnect.sns === "") {
      return setCheckError(true);
    } */ else {
      next("tokenChk");
    }
  };
  return (
    <React.Fragment>
      {isOpen ? (
        <React.Fragment>
          <div className="popup-overlay" onClick={close}></div>
          <div className="popup">
            <p className="popup-title">새로운 챗봇 생성</p>

            <div className="popup-content">
              <div className="botname-input">
                <div className="txt-name-in-popup">챗봇 이름</div>
                <input
                  type="text"
                  onChange={onChangeBotName}
                  placeholder="연동할 챗봇 이름을 적어주세요"
                />
              </div>
              <div className="botdesc-input">
                <div className="txt-name-in-popup">챗봇 설명</div>
                <textarea
                  cols="60"
                  onChange={onChangeBotDesc}
                  placeholder="연동할 챗봇에 대한 간략한 설명글을 적어주세요."
                />
              </div>
              {/* <div className="platform-select">
                <div className="txt-name-in-popup">연동할 플랫폼</div>
                <div className="sns-icons-container-in-popup">
                  <div
                    className={selectedSns[0].color ? "sns-color-line" : null}
                  >
                    <i className="fab fa-line"></i>
                  </div>
                  <div
                    className={
                      selectedSns[1].color ? "sns-color-facebook" : null
                    }
                  >
                    <i className="fab fa-facebook-square"></i>
                  </div>
                  <div
                    className={
                      selectedSns[2].color ? "sns-color-telegram" : null
                    }
                  >
                    <i className="fab fa-telegram"></i>
                  </div>
                  <div
                    className={selectedSns[3].color ? "sns-color-kakao" : null}
                  >
                    <i className="fab fa-kaggle"></i>
                  </div>
                </div>
                <div className="sns-select-container">
                  <input
                    data-tooltip-text="네이버 라인"
                    type="radio"
                    id="line"
                    value="line"
                    name="sns"
                    onChange={onChangeBotSns}
                  />
                  <input
                    data-tooltip-text="페이스북 메신저"
                    type="radio"
                    id="facebook"
                    value="facebook"
                    name="sns"
                    onChange={onChangeBotSns}
                  />
                  <input
                    data-tooltip-text="텔레그램"
                    type="radio"
                    id="telegram"
                    value="telegram"
                    name="sns"
                    onChange={onChangeBotSns}
                  />
                  <input
                    data-tooltip-text="카카오톡"
                    type="radio"
                    id="kakao"
                    value="kakao"
                    name="sns"
                    onChange={onChangeBotSns}
                  />
                </div>
                {checkError && (
                  <div className="checkError" style={{ color: "red" }}>
                    플랫폼을 선택해주세요.
                  </div>
                )}
              </div> */}
            </div>
            <div className="popup-button-wrap">
              <button onClick={close}>취소</button>
              <button onClick={isBotProfileEmpty}>다음</button>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
