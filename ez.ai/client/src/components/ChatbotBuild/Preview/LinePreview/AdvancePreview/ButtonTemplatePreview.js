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
        className={now == i ? "main-content buttonsbox-line now"
                            : "main-content buttonsbox-line"}
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("btn_template");
        }}
      >
        {/* 버튼 템플릿 이미지 없을 경우 이미지 영역 보이지 않음 */}
        {v.content.thumbnailImageUrl !== "" 
        ?
          <div
            className="buttons-thumbnail-line"
            style={{
              backgroundColor:v.content.imageBackgroundColor,
            }}
          >
            <img
              className="main-buttons-thumbnail-image"
              src={v.content.thumbnailImageUrl} 
              style={v.content.imageSize === "cover"? {width: "100%"} : {height:"100%"}}
            />
          </div>
        : 
          null
        }
        <div className="main-buttons-contents"> 
          {v.content.title !== "" 
          ?
            <div className="buttons-title-line">
              {v.content.title}
            </div>
          :
            null
          }
          <div className="buttons-text-line">
            {v.content.text !== ""
                ? v.content.text
                : "text"}
          </div>
          <div className="main-buttons-actions">
            <div className="space-top"></div>
            {v.content.actions.map((act,index) => (
              <div className="main-buttons-action">
                {act.label !== "" 
                  ? act.label
                  : "(button" + (index + 1) + ")"
                }
              </div>
            ))}
            <div className="space-bottom"></div>
          </div>
        </div>
      </div>
      <div
        className="tool-delete delete-buttons"
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