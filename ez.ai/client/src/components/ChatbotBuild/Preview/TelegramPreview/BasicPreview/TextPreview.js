import React from 'react'

const TextPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon
}) => {
  return(
      <div className="main-preview">
        <div
          className={now === i ? "main-content textbox-telegram now"
                              : "main-content textbox-telegram"}
          key={v.content + i}
          onClick={() => {
            setClickedMainInput(v);
            setNow(i);
            changeAvailableIcon("text");
          }}
        >
          <div>
            {v.content || ""}
          </div>
        </div>
          <div
              className="tool-delete delete-text"
              onClick={() => {
                  onDelete(v.id);
              }}
          >
              <i className="fas fa-times"></i>
          </div>
      </div>
  );

};

export default TextPreview;