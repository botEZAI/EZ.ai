import React, {useEffect} from "react";
import "./Profile.css";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER_REQUEST} from "../reducer/user";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({
                type: LOAD_USER_REQUEST,
            });
        }
    }, [user]);


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
                          <i className="far fa-images"></i>
                      </div>
                  </div>
                  <div className= "u-more__column">
                      <div className = "u-more__name">
                          별명 : XXX
                      </div>
                      <div className = "u-more__name-btn">수정</div>
                  </div>
                  
              </div>
          </div>
          <div className="user-info__more">
              <div className="u-title">
                  개인정보
              </div>
              <div className="u-profile__more">
                  <div className="u-more__infos">
                      <div className="u-more__info">이름 : </div>
                      <div className="u-more__info">생일 : </div>
                      <div className="u-more__info">이메일 : </div>
                      <div className="u-more__info">비밀번호 : </div>
                      <div className = "u-more__name-btn">정보수정</div>
                  </div>

              </div>
          </div>
          <div className="user-info__chatbot">
              <div className="u-title">
                  생성한 챗봇 목록
              </div>
              <div className="u-chatbots">
                  챗봇목록들 간단하게 보여줌
              </div>
              <div className="u-more__name-btn u-chatbots__detail">
                  자세히보기
              </div>
          </div>
      </div>
)
};

export default Profile;
