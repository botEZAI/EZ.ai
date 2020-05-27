import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.js";
import "./ChatbotBuild.css";
import BuilderInfo from "./BuilderInfo";
import Tabs from "./Tabs/Tabs";
import ToolBasic from "./Tabs/ToolBasic";
import ToolAdvance from "./Tabs/ToolAdvance";
import ToolKeyword from "./Tabs/ToolKeyword";
import ToolStatus from "./Status/ToolStatus";
import Main from "./Preview/Preview";
import { useDispatch, useSelector } from "react-redux";

const ChatbotBuild = (props) => {
  const dispatch = useDispatch();
  const { currentChatbot, currentCategories } = useSelector(
    (state) => state.chatbot
  );
  const [activeTab, setActiveTab] = useState("basic");
  const [keyword, setKeyword] = useState("");
  const [keywordList, setKeywordList] = useState(["Welcome"]);
  const [keywordContentList, setKeywordContentList] = useState([]);
  const [keywordCategory, setKeywordCategory] = useState([
    { category: "미분류", show: true },
  ]);

  const [keywordObject, setKeywordObject] = useState([
    {
      keyword: "Welcome",
      id: 1,
      contents: [],
      completed: false,
      category: keywordCategory[0].category,
    },
  ]);

  /* 선택한 요소 플랫폼별 사용가능 여부 */
  const [availableIcon, setAvailableIcon] = useState([
    { name: "kakao", use: false },
    { name: "line", use: false },
    { name: "facebook", use: false },
    { name: "telegram", use: false },
  ]);

  const [mainKeyword, setMainKeyword] = useState(keywordObject[0].keyword);
  const [clickedMainInput, setClickedMainInput] = useState(false);
  const [addFlag, setAddFlag] = useState(false); // 컨텐츠 추가 flag
  const [firstEntry, setFirstEntry] = useState(true); // 키워드 진입 flag
  const [virtualKeyboard, setVirtualKeyboard] = useState(false);
  const [now, setNow] = useState(-1); // 현재 작업중인 status id 번호
  const listCount = [
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ]; // 키보드 요소의 키워드 입력 총 개수
  const [curListCount, setCurListCount] = useState(listCount[1]);
  // 키보드(리스트) 요소에서 연동한 키워드 종류
  const initialKP = [
    // list 팝업에서 선택한 변수.
    { id: 0, value: "키워드 연동" },
    { id: 1, value: "키워드 연동" },
    { id: 2, value: "키워드 연동" },
    { id: 3, value: "키워드 연동" },
    { id: 4, value: "키워드 연동" },
    { id: 5, value: "키워드 연동" },
  ];
  const [keywordPopup, setKeywordPopup] = useState(initialKP);

  const index =
    currentChatbot && keywordObject.findIndex((v) => v.keyword === mainKeyword);
  const length =
    keywordObject[index] && keywordObject[index].contents.length - 1;

  const onSelect = useCallback((tab) => {
    setActiveTab(tab);
  }, []);
  // 키워드 클릭했을시
  const onClickKeyword = useCallback(
    (keyword) => () => {
      setNow(-1);
      setMainKeyword(keyword);
      setClickedMainInput(false);
      setFirstEntry(true); // 키워드 클릭 시, 스크롤 초기화 (맨 위로 가서 keyword-title 보이게 함)
      setVirtualKeyboard(false); // 키워드 클릭 시, Main의 '리스트' 하단 바 초기화(하단 바 안 보임)

      setAvailableIcon(availableIcon.map((i) => ({ ...i, use: false }))); // 새로운 키워드 선택시 status 정보초기화
    },
    [keywordObject]
  );

  //선택한 챗봇의 데이터와 카테고리 로딩
  useEffect(() => {
    const chatbotData = currentChatbot && JSON.parse(currentChatbot.data);
    chatbotData && setKeywordObject(chatbotData);
    const categoriesData = currentCategories && currentCategories;
    categoriesData && setKeywordCategory(categoriesData);
  }, []);

  return (
    <>
      <div className="builder">
        <div className="builder__column builder-info">
          <BuilderInfo
            keywordObject={keywordObject}
            keywordCategory={keywordCategory}
          />
        </div>
        <div className="builder__column builder-section">
          <div className="builder-main">
            <div className="builderTool">
              <div className="tool-menu">
                <div className="tool-tabs">
                  <Tabs activeTab={activeTab} onSelect={onSelect}>
                    <div label="basic">기본</div>
                    <div label="advance">고급</div>
                    <div label="keyword">키워드</div>
                  </Tabs>
                </div>
                {(activeTab === "basic" || activeTab === "advance") && (
                  <div className="tool-contents-title">
                    추가할 요소를 선택해주세요
                  </div>
                )}
                {activeTab === "basic" && (
                  <div className="tool-contents">
                    <ToolBasic
                      keywordObject={keywordObject}
                      mainKeyword={mainKeyword}
                      setAddFlag={setAddFlag}
                      setClickedMainInput={setClickedMainInput}
                      setKeywordObject={setKeywordObject}
                      setNow={setNow}
                      length={length}
                      availableIcon={availableIcon}
                      setAvailableIcon={setAvailableIcon}
                    />
                  </div>
                )}
                {activeTab === "advance" && (
                  <div className="tool-contents">
                    <ToolAdvance
                      keywordObject={keywordObject}
                      mainKeyword={mainKeyword}
                      setAddFlag={setAddFlag}
                      setClickedMainInput={setClickedMainInput}
                      setKeywordObject={setKeywordObject}
                      setNow={setNow}
                      setVirtualKeyboard={setVirtualKeyboard}
                      length={length}
                      availableIcon={availableIcon}
                      setAvailableIcon={setAvailableIcon}
                    />
                  </div>
                )}
                {activeTab === "keyword" && (
                  <ToolKeyword
                    setMainKeyword={setMainKeyword}
                    keyword={keyword}
                    keywordList={keywordList}
                    setKeyword={setKeyword}
                    setKeywordList={setKeywordList}
                    keywordObject={keywordObject}
                    keywordCategory={keywordCategory}
                    setKeywordCategory={setKeywordCategory}
                    onClickKeyword={onClickKeyword}
                    setKeywordObject={setKeywordObject}
                    index={index}
                  />
                )}
              </div>
              {(activeTab === "basic" || activeTab === "advance") && (
                <div className="tool-status">
                  <ToolStatus
                    mainKeyword={mainKeyword}
                    keywordObject={keywordObject}
                    setKeywordObject={setKeywordObject}
                    clickedMainInput={clickedMainInput}
                    now={now}
                    index={index}
                    setNow={setNow}
                    setClickedMainInput={setClickedMainInput}
                    keywordPopup={keywordPopup}
                    setKeywordPopup={setKeywordPopup}
                    listCount={listCount}
                    curListCount={curListCount}
                    setCurListCount={setCurListCount}
                    availableIcon={availableIcon}
                  />
                </div>
              )}
            </div>
            <div className="builderMain">
              <Main
                mainKeyword={mainKeyword}
                keywordContentList={keywordContentList}
                keywordObject={keywordObject}
                keywordList={keywordList}
                setKeywordObject={setKeywordObject}
                setClickedMainInput={setClickedMainInput}
                addFlag={addFlag}
                setAddFlag={setAddFlag}
                firstEntry={firstEntry}
                setFirstEntry={setFirstEntry}
                clickedMainInput={clickedMainInput}
                virtualKeyboard={virtualKeyboard}
                setVirtualKeyboard={setVirtualKeyboard}
                now={now}
                index={index}
                setNow={setNow}
                curListCount={curListCount}
                setCurListCount={setCurListCount}
                availableIcon={availableIcon}
                setAvailableIcon={setAvailableIcon}
              />
            </div>
          </div>
        </div>

        {/* 챗봇 빌더 오른쪽 사이드 바 기본 레이아웃*/}
        <Sidebar
          setKeywordObject={setKeywordObject}
          setKeywordCategory={setKeywordCategory}
          setNow={setNow}
          setClickedMainInput={setClickedMainInput}
        />
      </div>
    </>
  );
};

export default withRouter(ChatbotBuild);
