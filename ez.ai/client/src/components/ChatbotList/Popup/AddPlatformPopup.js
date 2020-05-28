import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CONNECT_CHATBOT_REQUEST } from "../../../reducer/chatbot";

const AddPlatformPopup = ({ addPlatformFlag, id, setAddPlatformFlag }) => {
  const { chatbotList } = useSelector((state) => state.chatbot);
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const onClickClose = () => {
    setAddPlatformFlag(null);
  };
  const onChangeToken = (e) => {
    setToken(e.target.value);
  };
  const addPlatformSubmit = () => {
    if (!token) {
      alert("토큰을 입력하세요.");
    } else {
      const platformInfo = JSON.parse(
        chatbotList.find((v) => v.id === id).platformInfo
      );
      platformInfo.find(
        (v) => v.platform === addPlatformFlag
      ).tokenData = token;
      platformInfo.find((v) => v.platform === addPlatformFlag).connect = true;
      dispatch({
        type: CONNECT_CHATBOT_REQUEST,
        data: { platformInfo, id },
      });
      setAddPlatformFlag(null);
    }
  };
  return (
    <>
      <div className="popup-overlay" onClick={onClickClose}></div>
      <div className="popup">
        <p className="popup-title">토큰 팝업</p>
        <div className="popup-content">
          <div className="txt-name-in-popup">{addPlatformFlag}Token 입력</div>
          <div className="token-input">
            <input
              type="text"
              onChange={onChangeToken}
              placeholder="지정한 플랫폼에서 발급받은 토큰을 입력해주세요."
            />
          </div>
        </div>

        <div className="popup-button-wrap">
          <button onClick={addPlatformSubmit}>확인</button>
        </div>
        {/* 임시 */}
        <div className="move-to-guide">
          <Link to="/guide">토큰 발급 받는 방법 > </Link>
        </div>
      </div>
    </>
  );
};

export default AddPlatformPopup;
