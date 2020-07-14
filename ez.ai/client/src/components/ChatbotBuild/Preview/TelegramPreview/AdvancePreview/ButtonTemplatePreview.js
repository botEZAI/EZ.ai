import React from "react"
import DefaultImage from "../../../../../objects/template-default-image.jpg"

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
        className={now == i ? "main-content buttonsbox-telegram now"
                            : "main-content buttonsbox-telegram"}
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("btn_template");
        }}
      >
        <div
          className="main-buttons-thumbnail"
          style={{
            backgroundColor:v.content.imageBackgroundColor,
          }}
        >
          {v.content.thumbnailImageUrl !== ""
          ? 
            <img
              className="main-buttons-thumbnail-image"
              src={v.content.thumbnailImageUrl}
            />
          :
            <img
              className="main-buttons-thumbnail-image default-thumbnail"
              src={DefaultImage}
            />
          }

        </div>
        <div className="main-buttons-contents">
          <div className="main-buttons-title">
            {v.content.title !== ""
              ? v.content.title
              : "TITLE"}
          </div>
          <div className="main-buttons-text">
            {v.content.text !== ""
              ? v.content.text
              : "text"}
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