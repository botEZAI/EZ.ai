import React, { useEffect } from "react";
import produce from "immer";
import axios from "axios";
import "./Main.css";
const Main = ({
  mainKeyword,
  keywordContentList,
  keywordObject,
  keywordList,
  mainKeywordObject,
  setKeywordObject
}) => {
  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  const onClickCurrent = e => {
    console.log(e.currentTarget);
  };

  //post
  const onClickButton = () => {
    axios
      .post("/api/chatbotbuild", { keywordObject })
      .then(res => console.log(res));
  };
  return (
    <>
      <button className="main-button" onClick={onClickButton}>
        저장
      </button>
      {keywordObject[index] && (
        <div className="main-keyword-title">
          KEYWORD: {keywordObject[index].keyword}
        </div>
      )}
      {keywordObject[index] &&
        keywordObject[index].contents.map((v, i) =>
          v.type === "text" ? (
            <>
              <div className="main-content" key={v.contnet + i}>
                <input
                  onClick={e => onClickCurrent(e)}
                  value={v.content || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        const tmp = draft[index].contents.find(
                          t => t.id === v.id
                        );
                        tmp.content = e.target.value;
                      })
                    );
                  }}
                  placeholder="text"
                />
              </div>
            </>
          ) : v.type === "image" ? (
            <>
              <div className="main-content" key={v.contnet + i}>
                <input
                  value={v.content || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        const tmp = draft[index].contents.find(
                          t => t.id === v.id
                        );
                        tmp.content = e.target.value;
                      })
                    );
                  }}
                  placeholder="image"
                />
              </div>
            </>
          ) : v.type === "location" ? (
            <>
              <div className="main-content" key={v.contnet + i}>
                <input
                  value={v.content.title || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        const tmp = draft[index].contents.find(
                          t => t.id === v.id
                        );
                        tmp.content.title = e.target.value;
                      })
                    );
                  }}
                  placeholder="title"
                />
                <input
                  value={v.content.latitude || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        const tmp = draft[index].contents.find(
                          t => t.id === v.id
                        );
                        tmp.content.latitude = e.target.value;
                      })
                    );
                  }}
                  placeholder="latitude"
                />
                <input
                  value={v.content.longtitude || ""}
                  onChange={e => {
                    setKeywordObject(
                      produce(keywordObject, draft => {
                        const tmp = draft[index].contents.find(
                          t => t.id === v.id
                        );
                        tmp.content.longtitude = e.target.value;
                      })
                    );
                  }}
                  placeholder="longtitude"
                />
              </div>
            </>
          ) : null
        )}

      {console.log("main")}
    </>
  );
};

export default Main;
