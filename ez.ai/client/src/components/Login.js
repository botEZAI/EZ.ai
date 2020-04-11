import React, { useCallback, useEffect } from "react";
import "./Login.css";
import { Link, withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useInput } from "./Register";
import { LOG_IN_REQUEST, LOAD_USER_REQUEST } from "../reducer/user";

const Login = ({ history }) => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { isLoggingIn, user, logInErrorReason } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      alert("로그인했으니 메인페이지로 이동합니다.");
      history.push("/");
    }
  }, [user && user.id]);
  useEffect(() => {
    if (logInErrorReason) {
      alert("비밀번호가 틀렸습니다.");
    }
  }, [logInErrorReason]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password,
        },
      });
    },
    [email, password]
  );

  return (
    <>
      <article className="article__login">
        <div className="login-area">
          <div className="logo">
            <div className="logo__image"></div>
            <p>
              <span>Ez.ai</span>에 오신 것을 환영합니다!
            </p>
          </div>

          <div className="external_login">
            <div className="google">구글 로그인</div>
            <div className="naver">네이버 로그인</div>
          </div>

          <div class="login-input">
            <form onSubmit={onSubmitForm} className="login-form">
              <input
                name="email"
                value={email}
                onChange={onChangeEmail}
                required
                placeholder="이메일"
              />
              <br />
              <input
                name="password"
                value={password}
                onChange={onChangePassword}
                type="password"
                required
                placeholder="비밀번호"
              />
              <div className="login-extra">
                <div className="login-keep">
                  <input type="checkbox" />
                  <span>로그인 유지</span>
                </div>
                <div className="login-find">
                  <span>아이디찾기</span>
                  <span>비밀번호찾기</span>
                </div>
              </div>
              <div className="login-btn">
                <button className="login-btn__login">로그인</button>
                <Link to="/register">
                  <button className="login-btn__register">회원가입</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </article>
    </>
  );
};

export default withRouter(Login);
