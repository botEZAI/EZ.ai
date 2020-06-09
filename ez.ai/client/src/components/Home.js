import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import human from "../objects/main-phone.png";
import chatbot from "../objects/main-chatbot.png";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const snsIcon = [
    "fab fa-line",
    "fab fa-facebook-square",
    "fab fa-telegram",
  ];
  const videoIcon = [
    "far fa-play-circle"
  ]
  return <div>
    <h2 className="hide">Ez.ai 소개</h2>
    <article className="main-about">
      <div className = "main-about__column">
        <div className= "main-about-sns-image">
          <img className="human" src={human}></img>
        </div>
        <div className= "main-about-btns">
          {/* [Let's go!] = 헤더의 '챗봇 만들기' 버튼과 유사한 기능 */}
          {!user ? (
              <div className= "main-about-btn main-btn-go">
                <Link to="/login">Let's go!</Link>
              </div>

          ) : (
            <div className= "main-about-btn main-btn-go">
                <Link to="/chatbotlist">Let's go!</Link>
            </div>
          )}
          {/* [소개] 페이지로 이동합니다. */}
            <div className= "main-about-btn main-btn-about">
              <Link to = "/about">About Ez.ai</Link>
            </div>
        </div>
      </div>
      <div className= "main-about__column">
        <div className="main-about-image">
        </div>
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
        <div className="main-wonder-btn">
          <Link to="/Guide">가이드라인 보기</Link>
        </div>
      </div>
    </article>
    <h2 className="hide">챗봇 소개</h2>
    <article className="main-what">
      <div className="main-what-title">
          What is Chatbot?
      </div>
      <div className="main-what__column">
        <div className="main-what-sns-image">
          <img className="chatbot" src={chatbot}></img>
        </div>
      </div>
      <div className="main-what__column">
          <div className="main-what-contents">
              <div className="main-what-content">
                  '챗봇'은 사람이 아니지만, 사람과 대화하는 것처럼 설계된 응용 채팅 프로그램입니다.
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
        <div className="main-how-title">
          How it Works?
        </div>
      <div className="main-how__column main-how-create">
        <div className="main-how-content-title">
          Easy, 생성
        </div>
        <div className="main-how-content">
          <p>만들고 싶은 봇의 이름을 정하면 끝.</p>
          <p>하나의 플랫폼을 선택하거나 모든 플랫폼을 선택할 수 있습니다.</p>
        </div>
      </div>

      <div className="main-how__column main-how-make">
        <div className="main-how-content-title">
          Easy, 제작
        </div>
        <div className="main-how-content">
          <p>익숙한 인터페이스로</p> 
          <p>더욱 친숙하게 다가갑니다.</p>
          <p>히스토리와 커밋형 저장으로</p> 
          <p>더욱 수월한 버전 관리 가능!</p>
        </div>
      </div>

      <div className="main-how__column main-how-publish">
        <div className="main-how-content-title">
          Easy, 배포
        </div>
        <div className="main-how-content">
          <p>원하는 시간,</p>
          <p> 원하는 플랫폼에,</p> 
          <p>버튼 하나로 배포하고 사용해보세요.</p>
        </div>
      </div>
    </article>
    <h2 className="hide">연동플랫폼</h2>
    <article className="main-sns">
      <div className="main-sns-title">
          Create and Deploy on Platforms
      </div>
      <div className="main-sns-logos">
          <div className="main-sns-logo">
            <div className="main-sns-logo-image">
              <i className={snsIcon[0]}></i>
            </div>
            <div className="main-sns-logo-name">Line
            </div>
          </div>

        <div className="main-sns-logo">
          <div className="main-sns-logo-image">
            <i className={snsIcon[1]}></i>
          </div>
          <div className="main-sns-logo-name">Telegram
          </div>
        </div>

        <div className="main-sns-logo">
          <div className="main-sns-logo-image">
            <i className={snsIcon[2]}></i>
          </div>
          <div className="main-sns-logo-name">Messenger
          </div>
        </div>
      </div>
    </article>
  </div>;
};

export default Home;
