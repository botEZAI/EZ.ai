import React, { useState } from "react";
import { useSelector } from "react-redux";
import './SideSetting.css';
import PlatformConnect from "../../../ChatbotList/BotItem/PlatformConnect";

const SideSetting = ({ setAddPlatformFlag }) => {
  const { currentChatbot } = useSelector(
    (state) => state.chatbot
  );
  /**값 보내기 전 */
  const [rename, setReName] = useState(currentChatbot&&currentChatbot.botname);
  const [redesc, setRedesc] = useState(currentChatbot&&currentChatbot.desc);

  const onChangeRename = (e) => {
    setReName(e.target.value);
  }
  const onChangeReDesc = (e) => {
    setRedesc(e.target.value);
  }

  return(
    <div className="chatbot-setting-list">
      <div className="chatbot-info-setting">
        <div className="chatbot-setting-title">
          <div className="chatbot-setting-title-text">
            챗봇 정보 수정
          </div>
          <div className="chatbot-setting-title-caution">
            챗봇의 이름과 챗봇에 대한 설명을 수정하세요
          </div>
        </div>
        <form method="post">
          <div className="d-flex">
            <dl className="chatbot-rename-set">
              <dt className="chatbot-rename-title input-label"> 
                <label for="rename-field">챗봇 이름 </label>
              </dt>
              <dd className="chatbot-rename-input">
                <input 
                  type="text"
                  value={rename}
                  onChange={(e) => onChangeRename(e)}
                  required='true'
                />
              </dd>
            </dl>
            <button 
              type="submit" 
              className="chatbot-rename-btn"
            >
              Rename
            </button>
          </div>
        </form>
        <form method="post">
          <div className="d-grid">
            <dl className="chatbot-redesc-set">
              <dt className="chatbot-redesc-title input-label"> 
                <label for="redesc-field">챗봇 설명</label> 
              </dt>
              <dd className="chatbot-redesc-textarea">
                <textarea
                  value={redesc} 
                  onChange={(e) => onChangeReDesc(e)}
                  required='true'
                />
              </dd>
            </dl>
            <button className="chatbot-redesc-btn">
              <i class="fas fa-pencil-alt"></i>
              Edit
            </button>
          </div>
        </form>
      </div>
      <div className="chatbot-connect-setting">
        <div className="chatbot-setting-title">
          <div className="chatbot-setting-title-text">
            챗봇 연동 플랫폼
          </div>
          <div className="chatbot-setting-title-caution">
            챗봇에 연동할 플랫폼을 선택하세요.
          </div>
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
          <div className="chatbot-setting-title-text">
            챗봇 삭제
          </div>
          <div className="chatbot-setting-title-caution">
            현재 작업 중인 챗봇을 삭제합니다.
          </div>
        </div>
        <div className="chatbot-delete-box">
          <p>
            <strong>챗봇을 삭제하겠습니까?</strong>
          </p>
          <p>
            한 번 챗봇을 지우면, 다시 되돌릴 수 없습니다.
          </p>
        </div>
        <button className="chatbot-delete-btn">
          Delete this chatbot
        </button>
      </div>
    </div>
  );
};

export default SideSetting;