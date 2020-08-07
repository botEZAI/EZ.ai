import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import humanImg from "../objects/main-phone.png";
import chatbotImg from "../objects/main-chatbot.png";
import logo from "../objects/ezai_logo.png";
import howWorkImg from "../objects/ezai_works.png";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const snsIcon = ["fab fa-line", "fab fa-facebook-square", "fab fa-telegram"];
  const videoIcon = ["far fa-play-circle"];
  return (
    <div>
      <h2 className="hide">Ez.ai 소개</h2>
      <article className="main-about">
        <div className="main-about__column">
          <div className="main-about-image">
            <img className="about-image-main" src={logo}></img>
          </div>
          {!user ? (
              <div className="main-about-btn main-btn-go">
                <Link to="/login">바로 시작하기</Link>
              </div>
          ) : (
              <div className="main-about-btn main-btn-go">
                <Link to="/chatbotlist">바로 시작하기</Link>
              </div>
          )}
        </div>
      </article>
      <h2 className="hide">Ez.ai 가이드라인</h2>
      <article className="main-wonder">
        <div className="main-wonder__column">
          <div className="main-wonder-title">
            <h1>개발 지식, 없어도 될까?</h1>
          </div>
          <div className="main-wonder-description">
            <p>단 한 명의 고객이,</p>
            <p>단 몇 분만에,</p>
            <p>그 어떤 개발지식 없이,</p>
            <p>고객의 모든 요구사항을 담아 제작하는 맞춤형 챗봇</p>
          </div>
        </div>
        <div className="main-wonder__column">
          <div className="main-wonder-promotion">
            <i className={videoIcon}></i>
          </div>

          {/* <div className="main-wonder-btn">
          <Link to="/Guide">가이드라인 보기</Link>
        </div> */}
        </div>
      </article>
      <h2 className="hide">챗봇 소개</h2>
      <article className="main-what">
        <div className="main-what-title">What is Chatbot?</div>
        <div className="main-what__column">
          <div className="main-what-sns-image">
            <img className="what-sns-image-main" src={chatbotImg}></img>
          </div>
        </div>
        <div className="main-what__column">
          <div className="main-what-contents">
            <div className="main-what-content">
              <span>챗봇</span>은 사람이 아니지만, <br/>사람과 대화하는 것처럼 설계된 <br/>응용 채팅
              프로그램입니다.
            </div>
            <div className="main-what-content">
              <p>채팅 화면에서 사람 대신 대화하는 로봇,</p>
              <p>챗봇은 "소통"의 도구로서 완벽합니다.</p>
              <p>복잡한 장문의 문서나</p>
              <p>불편한 전화 상담은 없습니다.</p>
              <p>가장 친절하고 간단명료한 답변을 제공합니다.</p>
            </div>
          </div>
        </div>
      </article>
      <h2 className="hide">Ez.ai 사용법</h2>
      <article className="main-how">
        <div className="main-how-title">How it Works?</div>
        <div className="main-how-content">
          <img src={howWorkImg} />
        </div>
      </article>
      <h2 className="hide">연동플랫폼</h2>
      <article className="main-sns">
        <div className="main-sns-title">현재 지원중인 챗봇 플랫폼</div>
        <div className="main-sns-logos">
          <div className="main-sns-logo">
            <div className="main-sns-logo-image">
              <i className={snsIcon[0]}></i>
            </div>
            <div className="main-sns-logo-name">라인</div>
          </div>

          <div className="main-sns-logo">
            <div className="main-sns-logo-image">
              <i className={snsIcon[2]}></i>
            </div>
            <div className="main-sns-logo-name">텔레그램</div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Home;
