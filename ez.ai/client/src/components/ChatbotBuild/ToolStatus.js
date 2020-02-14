import React from "react";
import produce from "immer";

const ToolStatus = ({ mainKeyword, keywordObject, setKeywordObject }) => {
  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  const length = keywordObject[index] && keywordObject[index].contents.length;
  const currentInput =
    keywordObject[index] && keywordObject[index].contents[length - 1];
  const currentContent =
    keywordObject[index] &&
    keywordObject[index].contents[length - 1] &&
    keywordObject[index].contents[length - 1].content;
  return (
    <>
        <div className = "tool-status-header">
            <div className="tool-status-name">
                {currentInput &&
                    (currentInput.type === "text" ? (
                        <>
                            <span>텍스트</span>
                        </>
                    ) : currentInput.type === "image" ? (
                        <>
                            <span>이미지</span>
                        </>
                        ) : currentInput.type === "location" ? (
                        <>
                            <span>위치</span>
                        </>
                        ) : currentInput.type === "list" ? (
                        <>
                            <span>버튼형 리스트</span>
                        </>
                        ) : null)}
            </div>
            <div className = "help" alt="도움말">?</div>
        </div>
          <div className="tool-status-main">
            {currentInput &&
              (currentInput.type === "text" ? (
                <>
                  <div className="status-input status-text">
                    <textarea
                      placeholder="작성하고자 하는 텍스트를 적어주세요"
                      value={currentContent || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </div>
                </>
              ) : currentInput.type === "image" ? (
                <>
                  <div className="status-input status-image">
                    <input
                      placeholder="image"
                      value={currentContent || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </div>
                </>
              ) : currentInput.type === "location" ? (
                <>
                  <div className="status-input status-location">
                    <input
                      placeholder="title"
                      value={currentContent.title || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.title =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="latitude"
                      value={currentContent.latitude || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.latitude =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="longtitude"
                      value={currentContent.longtitude || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content.longtitude =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </div>
                </>
              ) : currentInput.type === "list" ? (
                <>
                  <div className="status-input status-lsit">
                    <input
                      placeholder="lsit"
                      value={currentContent || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </div>
                </>
              ) : null)}
          </div>
        <div className = "tool-status-nav">
            <div></div>
            <div className = "tool-status-nav-btns">
                <div className = "tool-status-btn confirm">확인</div>
                <div className = "tool-status-btn decline">삭제</div>
            </div>
        </div>
    </>
  );
};

export default ToolStatus;
