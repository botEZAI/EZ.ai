import React from "react";

const Home = () => {
  return <div>
    <article className="main-about">
      <div className = "main-about__column">
        <div className= "main-about-sns-image">
        </div>
        <div className= "main-about-btns">
          <div className= "main-about-btn main-btn-go">
            Let's go!
          </div>
          <div className= "main-about-btn main-btn-about">
            About Ez.ai
          </div>
        </div>
      </div>
      <div className= "main-about__column">
        <div className="main-about-image">
          About.Ez.ai
        </div>
      </div>
    </article>

    <article className="main-wonder">
      <div className="main-wonder__column">
        <div className="main-wonder-title">
          <h1>개발 지식, 없어도 될까?</h1>
        </div>
        <div className="main-wonder-description">
          <p>단 한명의 고객이,</p>
          <p>단 몇 분만에,</p>
          <p>그 어떤 개발지식 없이,</p>
          <p>고객의 모든 요구사항을 담아 제작하는 맞춤형 챗봇</p>
          <p>어떤 모습일지 궁금하지 않으신가요?</p>
        </div>
      </div>
      <div className="main-wonder__column">
        <div className="main-wonder-promotion">
          /* 비디오 */
        </div>
        <div className="main-wonder-btn">
          가이드라인 보기
        </div>
      </div>
    </article>

    <article className="main-what">
      <div className="main-what-title">
          What is Chatbot?
      </div>
      <div className="main-what__column">
        <div className="main-what-sns-image">
          /* 이미지 */
        </div>
      </div>
      <div className="main-what__column">
          <div className="main-what-contents">
              <div className="main-what-content">
                  챗봇은 컴퓨터와 대화하는 것처럼 느끼지 않는 방식으로 사람과 가상 대화를 할 수 있는컴퓨터 생성 응용
                프로그램 입니다.
              </div>
              <div className="main-what-content">
                This is paragraph..
              </div>
          </div>
      </div>
    </article>

    <article className="main-how">
        <div className="main-how-title">
          How it Works?
        </div>
      <div className="main-how__column main-how-create">
        <div className="main-how-content-title">
          Easy, 생성
        </div>
        <div className="main-how-content">
          만들고 싶은 봇의 이름을 정하면 끝.
          하나의 플랫폼을 선택하거나 모든 플랫폼을 선택할 수 있습니다.
        </div>
      </div>

      <div className="main-how__column main-how-make">
        <div className="main-how-content-title">
          Easy, 제작
        </div>
        <div className="main-how-content">
          익숙한 인터페이스로 더욱 친숙하게 다가갑니다.
          히스토리와 커밋형 저장으로 더욱 수월한 버전 관리 가능!
        </div>
      </div>

      <div className="main-how__column main-how-publish">
        <div className="main-how-content-title">
          Easy, 배포
        </div>
        <div className="main-how-content">
          원하는 시간,
          원하는 플랫폼으로 배포 버튼 하나로 Deploy 하고 사용해보세요.
        </div>
      </div>
    </article>

    <article className="main-sns">
      <div className="main-sns-title">
          Create and Deploy on Platforms
      </div>
      <div className="main-sns-logos">
          <div className="main-sns-logo">
            <div className="main-sns-logo-image">
            </div>
            <div className="main-sns-logo-name">Line
            </div>
          </div>

        <div className="main-sns-logo">
          <div className="main-sns-logo-image">
          </div>
          <div className="main-sns-logo-name">Telegram
          </div>
        </div>

        <div className="main-sns-logo">
          <div className="main-sns-logo-image">
          </div>
          <div className="main-sns-logo-name">Messenger
          </div>
        </div>
      </div>
    </article>
  </div>;
};

export default Home;
