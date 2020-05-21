import React, { useCallback, useState, useEffect } from "react";
import "./SidePreview.css";
import { useInput } from "../../../Register.js";
import Clock from "react-live-clock";
import { useSelector } from "react-redux";

const SidePreview = (props) => {
  var dayList = ["일", "월", "화", "수", "목", "금", "토"];
  var today = new Date();
  var dd = dayList[today.getDay()];
  var theHours = today.getHours();
  var noon = "오전";
  if (theHours > 12) {
    theHours = theHours - 12;
    noon = "오후";
  }

  const { currentChatbot } = useSelector((state) => state.chatbot);
  const [message, onChangeMessage, reset] = useInput("");

  //미리보기 => 사용자가 키워드 입력시 일치하는 키워드를 찾아서 dialogues 배열에 추가하는 방식
  const [dialogues, setDialogues] = useState([]);

  //전달받은 키워드 안의 요소들의 타입을 구별후 배열 return
  const addDialogue = (findKeyword) => {
    const dialogues = findKeyword.contents.map((c) => {
      if (c.type === "text")
        return (
          <div
            className={`preview-receive ${props.activePlatformTab} ${props.activePlatformTab}-text`}
          >
            {c.content}
          </div>
        );
      else if (c.type == "list")
        return (
          <div
            className={`preview-receive ${props.activePlatformTab} ${props.activePlatformTab}-list`}
          >
            <div className={`${props.activePlatformTab}-list-question`}>
              {c.listContent.question}
            </div>
            {c.listContent.elem.map((i) => {
              return (
                <div
                  className={`preview-button ${props.activePlatformTab}-list-elem`}
                  onClick={() => moveKeyword(i)}
                >
                  {i}
                </div>
              );
            })}
          </div>
        );
      else if (c.type == "image")
        return (
          <div
            className={`preview-receive ${props.activePlatformTab} ${props.activePlatformTab}-image`}
          >
            <div
              className="main-image-preview"
              style={{ backgroundImage: `url(${c.content})` || null }}
            ></div>
          </div>
        );
    });
    return dialogues;
  };

  const moveKeyword = useCallback(
    (i) => {
      setDialogues((prev) => [...prev, sendMessage(i)]);
    },
    [dialogues, message, currentChatbot]
  );
  //처음 시작시 Welcome키워드에 있는 요소 먼저 나타남
  useEffect(() => {
    const welcomeDialogue = JSON.parse(currentChatbot.data)[0];
    setDialogues(addDialogue(welcomeDialogue));
  }, [props.activePlatformTab, currentChatbot]);

  const onSubmitPreview = useCallback(
    (e) => {
      e.preventDefault();

      //sendMessage 함수로부터 return받은 배열을  dialogues배열에 추가
      setDialogues((prev) => [...prev, sendMessage(message)]);
      console.log(message,"mmmm")

      console.log(reset(),"rrrr", message)
    },
    [message]

  );


  //일치하는 키워드가 있으면 키워드의 내용을 addDialogue함수로 전달
  const sendMessage = useCallback(
    (input) => {
      const findKeyword = JSON.parse(currentChatbot.data).find(
        (k) => k.keyword === input
      );
      console.log(findKeyword);
      if (!findKeyword)
        return (
            <>
              <div className="preview-send">{input}</div>
            <div
              className={`preview-receive ${props.activePlatformTab} ${props.activePlatformTab}-notfound`}
            >
              키워드를 찾을 수 없습니다.
            </div>
            </>
        );
      return (
        <>
          <div
            className={`preview-send  ${props.activePlatformTab} ${props.activePlatformTab}-send`}
          >
            {input}
          </div>
          {/* 키워드 전달 후 일치하는 요소들의 배열을 return받음 */}
          {addDialogue(findKeyword)}
        </>
      );

    },
    [message, currentChatbot, dialogues]

  );
  return (
    <>
      {props.activePlatformTab == "platform-kakao" ? (
        <div className="preview-container side-kakao">
          <div className="preview-header"></div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock
                format={"YYYY년 MM월 DD일 " + dd + "요일"}
                ticking={true}
                timezone={"Asia/Seoul"}
              />
            </div>
          </div>
          <div className="preview-footer">
            <div class="preview-input input-kakao">
              <input type="text" placeholder="Say Something" />
            </div>
          </div>
        </div>
      ) : null}
      {props.activePlatformTab == "platform-line" ? (
        <div className="preview-container side-line">
          <div className="preview-header"></div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock
                format={"MM월 DD일 (" + dd + ")"}
                ticking={true}
                timezone={"Asia/Seoul"}
              />
            </div>
          </div>
          <div className="preview-footer">
            <div class="preview-input input-line">
              <input type="text" placeholder="Say Something" />
            </div>
          </div>
        </div>
      ) : null}
      {props.activePlatformTab == "platform-facebook" ? (
        <div className="preview-container side-facebook">
          <div className="preview-header"></div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock
                format={noon + " " + theHours + ":mm"}
                ticking={true}
                timezone={"Asia/Seoul"}
              />
            </div>
          </div>
          <div className="preview-footer">
            <div class="preview-input input-facebook">
              <input type="text" placeholder="Say Something" />
            </div>
          </div>
        </div>
      ) : null}
      {props.activePlatformTab == "platform-telegram" ? (
        <div className="preview-container side-telegram">
          <div className="preview-header"></div>
          <div className="preview-contents">
            <div class="datetime">
              <Clock
                format={"MM월 DD일"}
                ticking={true}
                timezone={"Asia/Seoul"}
              />
            </div>
            <div className="preview-send">/start</div>
            {dialogues.map((dialogue) => {
              return dialogue;
            })}
          </div>
          <div className="preview-footer">
            <div className="preview-footer-imogi">
              <i className="far fa-smile"></i>
            </div>
            <div class="preview-input input-telegram">
              <form onSubmit={onSubmitPreview}>
                <input
                  type="text"
                  placeholder="메세지"
                  onChange={onChangeMessage}
                />
              </form>
            </div>
            <div className="preview-footer-icons">
              <div className="preview-footer-icon">
                <i className="far fa-keyboard"></i>
              </div>
              <div className="preview-footer-icon">
                <i className="fas fa-paperclip"></i>
              </div>
              <div className="preview-footer-icon">
                <i className="fas fa-microphone"></i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SidePreview;
