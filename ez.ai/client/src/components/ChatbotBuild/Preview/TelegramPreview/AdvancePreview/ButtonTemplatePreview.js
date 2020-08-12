import React from "react";

const ButtonTemplatePreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon,
  setVirtualKeyboard,
  platformInfo,
}) => {
  return (
    <>
      {/* 이미지 시작 */}
      {v.content.thumbnailImageUrl !== "" ? (
        <div
          className={`main-preview ${
            platformInfo[0].connect && i >= 4 ? `lineLimit` : ``
          }`}
        >
          <div
            className={
              now === i
                ? "main-content buttonsbox-telegram now"
                : "main-content buttonsbox-telegram"
            }
            key={v.content + i}
            onClick={(e) => {
              setClickedMainInput(v);
              e.stopPropagation();
              setNow(i);
              setVirtualKeyboard(true);
              changeAvailableIcon("btn_template");
            }}
          >
            <div
              className="buttons-thumbnail-telegram"
              style={{
                backgroundColor: v.content.imageBackgroundColor,
              }}
            >
              <img
                className="main-buttons-thumbnail-image"
                src={v.content.thumbnailImageUrl}
                style={
                  v.content.imageSize === "cover"
                    ? { width: "100%" }
                    : { height: "100%" }
                }
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* 이미지 끝 */}
      {/* 텍스트 시작 */}
      {v.content.title !== "" ? (
        <div className="main-preview">
          <div
            className={
              now === i
                ? "main-content buttons-title-telegram now"
                : "main-content buttons-title-telegram"
            }
            onClick={() => {
              setClickedMainInput(v);
              setNow(i);
              changeAvailableIcon("btn_template");
            }}
          >
            {v.content.title}
          </div>
        </div>
      ) : null}

      <div className="main-preview">
        <div
          className={
            now === i
              ? "main-content buttons-text-telegram now"
              : "main-content buttons-text-telegram"
          }
          onClick={() => {
            setClickedMainInput(v);
            setNow(i);
            changeAvailableIcon("btn_template");
          }}
        >
          {v.content.text !== "" ? v.content.text : "text"}
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
    </>
  );
};

export default ButtonTemplatePreview;
