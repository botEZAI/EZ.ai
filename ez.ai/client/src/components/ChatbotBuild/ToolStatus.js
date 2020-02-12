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
      <div className="tool-status">
        {currentInput &&
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
    </>
  );
};

export default ToolStatus;
