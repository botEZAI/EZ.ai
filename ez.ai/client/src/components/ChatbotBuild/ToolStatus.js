import React from "react";
import produce from "immer";

const ToolStatus = ({
  mainKeyword,
  keywordObject,
  setKeywordObject,
  clickedMainInput
}) => {
  const index = keywordObject.findIndex(v => v.keyword === mainKeyword);
  const length = keywordObject[index] && keywordObject[index].contents.length;
  const currentInput =
    keywordObject[index] && keywordObject[index].contents[length - 1];
  const currentContent =
    keywordObject[index] &&
    keywordObject[index].contents[length - 1] &&
    keywordObject[index].contents[length - 1].content;
  console.log(clickedMainInput.content);
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
        {!clickedMainInput.content &&
          currentInput &&
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
            <div className ="image-status">
                <div className="status-image-tab">
                    <div className = "image-tab-btn outer-img-link">외부 이미지 URL</div>
                    <div className = "image-tab-btn upload-img-file">이미지 첨부하기</div>
                </div>

                <div className="status-input status-image">
                    <div className = "status-image-input">
                        <input
                          placeholder="외부 URL를 입력해주세요"
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
                        <div className="outer-img-btn">적용</div>
                    </div>
                    <div className = "image-preview">
                        <div className = "image-preview-screen">이미지 미리보기</div>
                    </div>
                </div>
            </div>

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
              <div className="status-input status-list">
                <table>
                  <tr>
                    <input
                      placeholder="list"
                      value={currentContent[0] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content[0] =
                              e.target.value;
                          })
                        );
                      }}
                    />

                    <input
                      placeholder="list"
                      value={currentContent[1] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content[1] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="list"
                      value={currentContent[2] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content[2] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <input
                      placeholder="list"
                      value={currentContent[3] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content[3] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="list"
                      value={currentContent[4] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content[4] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                    <input
                      placeholder="list"
                      value={currentContent[5] || ""}
                      onChange={e => {
                        setKeywordObject(
                          produce(keywordObject, draft => {
                            draft[index].contents[length - 1].content[5] =
                              e.target.value;
                          })
                        );
                      }}
                    />
                  </tr>
                </table>
              </div>
            </>
          ) : null)}
        {clickedMainInput.content &&
          (clickedMainInput.type === "text" ? (
            <>
              <div className="status-input status-text">
                <input value={clickedMainInput.content} />
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
