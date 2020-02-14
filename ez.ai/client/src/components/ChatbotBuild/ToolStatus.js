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
      <div className="tool-status">
        {!clickedMainInput.content &&
          currentInput &&
          (currentInput.type === "text" ? (
            <>
              <div className="status-input status-text">
                <input
                  placeholder="text"
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
    </>
  );
};

export default ToolStatus;
