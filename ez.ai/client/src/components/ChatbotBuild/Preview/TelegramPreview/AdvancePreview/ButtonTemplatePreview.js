import React from "react"

const ButtonTemplatePreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  changeAvailableIcon
}) => {
  return(
    <div className="main-preview">
      <div
        className={now == i ? "main-content btntemplatebox-telegram now"
                            : "main-content btntemplatebox-telegram"}
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("btn_template");
        }}
      >
        <div
          className="main-btn-template-thumbnail"
        >
          이미지
        </div>
        <div
          className="main-btn-template-contents"
        >
          <div
            className="main-btn-template-title"
          >
            텍스트(Title)
          </div>
          <div
            className="main-btn-template-text"  
          >
            텍스트(text)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonTemplatePreview;