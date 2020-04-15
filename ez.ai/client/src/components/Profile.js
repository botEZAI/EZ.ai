import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
      <div className="user-info">
        <div className = "user-info__title">
            내정보
        </div>
          <div className="user-info__profile">
              <div className="u-title">
                  프로필
              </div>
              <div className="u-profile__more">
                  <div className= "u-more__column">
                      <div className="u-more__picture">
                            사진
                      </div>
                  </div>
                  <div className= "u-more__column">
                      <div className = "u-more__name">
                          별명 ( 수정가능하게)
                      </div>
                  </div>
                  
              </div>
          </div>
          <div className="user-info__more">
              개인정보 - 이름, 생일, 이메일,비밀번호 (변경기능까지)
          </div>
          <div className="user-info__chatbot">
              생성한 챗복 목록 단순하게 보여줌, 챗봇 생성, 수정하러가기(버튼 -> 챗봇목록으로 넘어감)
          </div>
      </div>
)
};

export default Profile;
