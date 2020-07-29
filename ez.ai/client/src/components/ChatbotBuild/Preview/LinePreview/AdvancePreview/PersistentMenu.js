import React from 'react';
import produce from "immer";

const PersistentMenu = ({
  keywordObject, 
  index, 
  now,
  clickedMainInput,
  currentInput,
  virtualKeyboard,
  curListCount,
  setCurListCount,
  setKeywordObject,
}) => {
    //리스트 요소 삭제
    const removeListElement = id => {
      setCurListCount(curListCount.filter(num => num !== id));
      setKeywordObject(
        produce(keywordObject, draft => {
          draft[index].contents[now].listContent.keywordLink[id] = "";
          draft[index].contents[now].listContent.elem[id] = "";
        })
      );
    };
  return (
    <>
    {virtualKeyboard ? (
      <div className="persistent-container">
        {(clickedMainInput.type ||
          (!clickedMainInput.type && currentInput)) &&
          (currentInput.type === "list" ||
          clickedMainInput.type === "list" ? (
            <>
              <div className="persistent-menu-line">
                {curListCount.length <= 4 ?
                  <>
                    {curListCount.map((i) => (
                      <div className="list-elem-wrapper">
                        <span className="list-elem">
                          {keywordObject[index].contents[now].listContent
                            .keywordLink[i] || ""}
                        </span>
                        <span
                          className="clear-button"
                          onClick={() => {
                            removeListElement(i);
                          }}
                        >
                          x
                        </span>
                      </div>
                    ))}
                 </>
                :
                  <div className="limit-state-message">
                    라인의 고정메뉴 최대 4개까지 등록 가능합니다.
                  </div>
                }
              </div>
            </>
          ) 
          : 
          null
          )}
      </div>
    ) : null}
    </>
  )
}
export default PersistentMenu;