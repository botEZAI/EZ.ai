import React from "react";
import "./BuilderInfo.css";
import { useSelector } from "react-redux";

const BuilderInfo = () => {
  const { currentChatbot } = useSelector((state) => state.chatbot);
  return (
    <>
      <div className="info__column">
        <div className="info-name">
          <p>챗봇 이름:{currentChatbot && currentChatbot.botname}</p>
        </div>
        <div className="info-discription">
          <p>챗봇 간단 설명:{currentChatbot && currentChatbot.desc}</p>
        </div>
      </div>
      <div className="info__column">
        <div className="info-platform">
          <p>플랫폼 정보:{currentChatbot && currentChatbot.sns}</p>
        </div>
      </div>
      <div className="info__column">
        <button>저장</button>
        <button>배포</button>
        <div className="builder_undo">배포 전 되돌아가기</div>
      </div>
    </>
  );
};

export default BuilderInfo;
