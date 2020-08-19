import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./SideSetting.css";
import PlatformConnect from "../../../ChatbotList/BotItem/PlatformConnect";

const SideSetting = ({ setAddPlatformFlag }) => {
  const { currentChatbot } = useSelector((state) => state.chatbot);
  /**값 보내기 전 */
  const [rename, setReName] = useState(
    currentChatbot && currentChatbot.botname
  );
  const [redesc, setRedesc] = useState(currentChatbot && currentChatbot.desc);

  const onChangeRename = (e) => {
    setReName(e.target.value);
  };
  const onChangeReDesc = (e) => {
    setRedesc(e.target.value);
  };

  return (
    <div className="chatbot-setting-list">
      <div className="chatbot-info-setting">
        <div className="chatbot-setting-title">
          <div className="chatbot-setting-title-text">기본 정보</div>
          <div className="chatbot-setting-title-caution"></div>
        </div>
        <form method="post">
          <div className="setting__column">
            <div className="chatbot-rename-set">
              <div className="chatbot-rename-title input-label">
                <label for="rename-field">챗봇 이름 </label>
              </div>
              <div className="chatbot-rename-input">
                <input
                  type="text"
                  value={rename}
                  onChange={(e) => onChangeRename(e)}
                  required="true"
                />
              </div>
            </div>
            <button type="submit" className="chatbot-rename-btn">
              수정
            </button>
          </div>
        </form>
        <form method="post">
          <div className="setting__column">
            <div className="chatbot-redesc-set">
              <div className="chatbot-redesc-title input-label">
                <label for="redesc-field">챗봇 설명</label>
              </div>
              <div className="chatbot-redesc-textarea">
                <textarea
                  value={redesc}
                  onChange={(e) => onChangeReDesc(e)}
                  required="true"
                />
              </div>
            </div>
            <button className="chatbot-rename-btn">수정</button>
          </div>
        </form>
      </div>
      <div className="chatbot-connect-setting">
        <div className="chatbot-setting-title">
          <div className="chatbot-setting-title-text">연동 플랫폼</div>
          <div className="chatbot-setting-title-caution"></div>
        </div>
        <div>
          <div className="chatbot-platform-container">
            <PlatformConnect
              id={currentChatbot.id}
              setAddPlatformFlag={setAddPlatformFlag}
            />
          </div>
        </div>
      </div>
      <div className="chatbot-deletion">
        <div className="chatbot-setting-title">
          <div className="chatbot-setting-title-text">챗봇 삭제</div>
          <div className="chatbot-setting-title-caution"></div>
        </div>
        <div className="chatbot-delete-box">
          <p>삭제 이후에는 다시 되돌릴 수 없습니다.</p>
        </div>
        <button className="chatbot-delete-btn">챗봇 삭제하기</button>
      </div>
    </div>
  );
};

export default SideSetting;
