
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  UPDATE_CHATBOTNAME_REQUEST,
  UPDATE_CHATBOTDESC_REQUEST,
  DELETE_CHATBOT_REQUEST,
} from "../../../../reducer/chatbot";
import "./SideSetting.css";
import PlatformConnect from "../../../ChatbotList/BotItem/PlatformConnect";

const SideSetting = ({ setAddPlatformFlag, history }) => {
  const { currentChatbot } = useSelector((state) => state.chatbot);
  const dispatch = useDispatch();

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

  const onUpdateChatbotName = (e) => {
    const id = currentChatbot.id;
    const success = dispatch({
      type: UPDATE_CHATBOTNAME_REQUEST,
      data: { rename, id },
    });
    if (success) alert("수정 성공");
  };
  const onUpdateChatbotDesc = (e) => {
    const id = currentChatbot.id;
    const success = dispatch({
      type: UPDATE_CHATBOTDESC_REQUEST,
      data: { redesc, id },
    });
    if (success) alert("수정 성공");
  };
  const onDeleteChatbot = (e) => {
    const id = currentChatbot.id;
    const confirmDelete = window.confirm(
      "정말로 선택하신 챗봇빌더를 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      dispatch({
        type: DELETE_CHATBOT_REQUEST,
        data: { id },
      });
      history.push("/chatbotlist");
    }
  };


  return (
    <div className="chatbot-setting-list">
      <div className="chatbot-info-setting">
        <div className="chatbot-setting-title">
          <div className="chatbot-setting-title-text">기본 정보</div>
          <div className="chatbot-setting-title-caution"></div>

        </div>

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
          <button
            className="chatbot-rename-btn"
            onClick={(e) => onUpdateChatbotName(e)}
          >
            수정
          </button>
        </div>

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
          <div
            className="chatbot-rename-btn"
            onClick={(e) => onUpdateChatbotDesc(e)}
          >
            수정
          </div>
        </div>
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

        <button
          className="chatbot-delete-btn"
          onClick={(e) => {
            onDeleteChatbot(e);
          }}
        >
          챗봇 삭제하기
        </button>

      </div>
    </div>
  );
};

export default withRouter(SideSetting);

