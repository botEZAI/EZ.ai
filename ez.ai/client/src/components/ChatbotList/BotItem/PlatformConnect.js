import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DISCONNECT_CHATBOT_REQUEST,
} from "../../../reducer/chatbot";

const PlatformConnect = ({ id, setAddPlatformFlag }) => {
  const dispatch = useDispatch();
  const { chatbotList } = useSelector(
    (state) => state.chatbot
  );
  const snsIcon = ["fab fa-line", "fab fa-telegram"];

  const onClickPlatform = useCallback(
    (info) => {
      //연결되어 있으면 해제
      if (info.connect) {
        const connect = window.confirm("연동을 해제하시겠습니까?");
        if (connect) {
          const platformInfo = JSON.parse(
            chatbotList.find((v) => v.id === id).platformInfo
          );
          platformInfo.find(
            (v) => v.platform === info.platform
          ).connect = false;

          dispatch({
            type: DISCONNECT_CHATBOT_REQUEST,
            data: { platformInfo, id },
          });
        }
      } else {
        setAddPlatformFlag(info.platform);
      }
    },
    [chatbotList]
  );

  return(
    <>
      {JSON.parse(
        chatbotList.find((v) => v.id === id).platformInfo
      ).map((info, i) => (
        <div
          className={
            info.connect
              ? `sns-color-${info.platform} sns-icon-container`
              : "sns-icon-container"
          }
        >
          <div className="sns-icon-container-info">
            <div className="sns-icon-container-icon">
              <i className={snsIcon[i]}></i>

            </div>
            {info.connect ? (
                <input className="sns-connect-info" value={'연동되었습니다'} disabled/>
            ) : (
                <input className="sns-connect-info" value={'연동정보가 없습니다'} disabled/>
            )}
          </div>
          <div className="sns-icon-container-connect">
            <div className="sns-icon-container-toggle">
              <label className="switch">
                <input
                  type="checkbox"
                  className="sns-icon-checkbox"
                  onClick={() => onClickPlatform(info)}
                  checked={info.connect}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default PlatformConnect;