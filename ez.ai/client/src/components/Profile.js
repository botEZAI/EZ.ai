import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_REQUEST, UPDATE_USERINFO_REQUEST } from "../reducer/user";
import ChatbotList from "./ChatbotList";
import axios from "axios";

export const useInput = (initValue) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  const reset = useCallback(() => setter(initValue), [initValue]);
  return [value, handler, reset];
};

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [userName, onChangeUserName] = useInput(user && user.name);
  const [nickName, onChangeNickName] = useInput(user && user.nick);
  const [birthday, onChangeBirthday] = useInput(user && user.birth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, [user]);

  const [changeInfo, setChangeInfo] = useState(true);
  const userInfoInput = () => {
    if (changeInfo === true && userName === (user && user.name))
      setChangeInfo(!changeInfo);
    else {
      if (userName !== (user && user.name)) {
        dispatch({
          type: UPDATE_USERINFO_REQUEST,
          data: {
            userName,
            nickName,
            birthday,
          },
        });
        dispatch({
          type: LOAD_USER_REQUEST,
        });
      }
      setChangeInfo(!changeInfo);
    }
  };

  /* 프로필 사진 */
  const imgRef = useRef();

  const [profileURL, setProfileURL] = useState("");

  const onClickUploadImage = () => {
    imgRef.current.click();
  };

  const onChangeImage = async (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/image/g)) {
      const imageFormData = new FormData();
      imageFormData.append("image", e.target.files[0]);

      // 보안상 로컬경로는 fakepath로 뜨기 때문에 실제 파일이 업로드 된 후 업로드 된 실파일경로를 가져와야함

      await axios
        .post("/api/image/profile", imageFormData, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch({
            type: LOAD_USER_REQUEST,
          });
        });
    } else return alert("이미지 파일이 아닙니다.");
  };

  return (
    <div className="user-info">
      <div className="user-info__title">내정보</div>
      <div className="user-info__profile">
        <div className="u-title">프로필</div>
        <div className="u-profile__more">
          <div className="u-more__column">
            <div
              className="u-more__picture"
              style={{ backgroundImage: `url(${user && user.profileImage})` }}
            ></div>
          </div>
          <div className="u-more__column">
            <div className="u-more__name-btn" onClick={onClickUploadImage}>
              프로필 사진 업로드
            </div>
            <input ref={imgRef} type="file" hidden onChange={onChangeImage} />
            <div className="u-more__name-btn-caution">
              프로필 사진은 10MB 이하의 JPG, PNG, JPEG만 가능합니다.
            </div>
          </div>
        </div>
      </div>
      <div className="user-info__more">
        <div className="u-title">개인정보</div>
        <div className="u-profile__more">
          <div className="u-more__infos">
            <div className="u-more__info">
              <div>이메일 : </div>
              <div className="u-more__info-data">{user && user.email}</div>
            </div>
            <div className="u-more__info">
              <div>별명 : </div>
              {changeInfo ? (
                <div className="u-more__info-data">{user && user.nick}</div>
              ) : (
                <input value={nickName} onChange={onChangeNickName} />
              )}
            </div>
            <div className="u-more__info">
              <div>이름 : </div>
              {changeInfo ? (
                <div className="u-more__info-data">{user && user.name}</div>
              ) : (
                <input value={userName} onChange={onChangeUserName} />
              )}
            </div>
            <div className="u-more__info">
              <div>생일 : </div>
              {changeInfo ? (
                <div className="u-more__info-data">{user && user.birth}</div>
              ) : (
                <input value={birthday} onChange={onChangeBirthday} />
              )}
            </div>

            {/* <div className="u-more__info">
              <div>비밀번호 : </div>
              <div className="u-more__info-data">{user && user.password}</div>
            </div> */}
            <div className="u-more__name-btn" onClick={() => userInfoInput()}>
              개인정보 수정
            </div>
          </div>
        </div>
      </div>
      <div className="user-info__chatbot">
        <div className="u-title">생성한 챗봇 목록</div>
        <div className="u-chatbots"></div>
        <div className="u-more__name-btn u-chatbots__detail">
          <ChatbotList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
