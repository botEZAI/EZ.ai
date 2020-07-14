import React from "react"

const ButtonTemplatePreview = ({
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
        className={now == i ? "main-content btntemplatebox-Line now"
                            : "main-content btntemplatebox-Line"}
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
          <div className="main-btn-template-actions">
            
          </div>
        </div>
        
        Hello Button Template. Telegram
      </div>
      <div
        className="tool-delete delete-btntemplate "
        onClick={() => {
          onDelete(v.id, "list");
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default ButtonTemplatePreview;