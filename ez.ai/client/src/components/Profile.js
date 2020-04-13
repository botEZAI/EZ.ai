import React from "react";

const Profile = () => {
  return (
      <div className="user-info">
        <div className = "user-info__title">
            내정보 페이지 제목
        </div>
          <div className="user-info__profile">
              프로필 - 사진, 별명    ( 수정가능하게)
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
