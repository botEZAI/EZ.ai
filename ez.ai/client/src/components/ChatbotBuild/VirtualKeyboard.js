import React from 'react';

const VirtualKeyboard = ({
  keywordObject, 
  index, 
  now,
  removeListElement,
  clickedMainInput,
  currentInput,
  virtualKeyboard
}) => {
  return (
    <>
    {virtualKeyboard ? (
      <div>
        {(clickedMainInput.type ||
          (!clickedMainInput.type && currentInput)) &&
          (currentInput.type === "list" ||
          clickedMainInput.type === "list" ? (
            <>
              <div className="virtual-keyboard">
                {keywordObject[index].contents[now].listContent.elem[0] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">
                      {keywordObject[index].contents[now].listContent
                        .elem[0] || ""}
                    </span>
                    <span
                      className="clear-button"
                      onClick={() => {
                        removeListElement(0);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
                {keywordObject[index].contents[now].listContent.elem[1] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">
                      {keywordObject[index].contents[now].listContent
                        .elem[1] || ""}
                    </span>
                    <span
                      className="clear-button"
                      onClick={() => {
                        removeListElement(1);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
                {keywordObject[index].contents[now].listContent.elem[2] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">
                      {keywordObject[index].contents[now].listContent
                        .elem[2] || ""}
                    </span>
                    <span
                      className="clear-button"
                      onClick={() => {
                        removeListElement(2);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
                {keywordObject[index].contents[now].listContent.elem[3] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">
                      {keywordObject[index].contents[now].listContent
                        .elem[3] || ""}
                    </span>
                    <span
                      className="clear-button"
                      onClick={() => {
                        removeListElement(3);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
                {keywordObject[index].contents[now].listContent.elem[4] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">
                      {keywordObject[index].contents[now].listContent
                        .elem[4] || ""}
                    </span>
                    <span
                      className="clear-button"
                      onClick={() => {
                        removeListElement(4);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
                {keywordObject[index].contents[now].listContent.elem[5] && (
                  <div className="list-elem-wrapper">
                    <span className="list-elem">
                      {keywordObject[index].contents[now].listContent
                        .elem[5] || ""}
                    </span>
                    <span
                      className="clear-button"
                      onClick={() => {
                        removeListElement(5);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
                {!keywordObject[index].contents[now].listContent.elem[0] &&
                  !keywordObject[index].contents[now].listContent.elem[1] &&
                  !keywordObject[index].contents[now].listContent.elem[2] &&
                  !keywordObject[index].contents[now].listContent.elem[3] &&
                  !keywordObject[index].contents[now].listContent.elem[4] &&
                  !keywordObject[index].contents[now].listContent
                    .elem[5] && (
                    <div className="list-elem-default"> KEYWORD </div>
                )}
              </div>
            </>
          ) : null)}
      </div>
    ) : null}
    </>
  )
}
export default VirtualKeyboard;