import React from "react";

const ImagePreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon,
  platformInfo,
}) => {
  return (
    <div
      className={`main-preview ${
        platformInfo[0].connect && i >= 4 ? `lineLimit` : ``
      }`}
    >
      <div
        className={
          now === i
            ? "main-content imgbox-telegram now"
            : "main-content imgbox-telegram"
        }
        key={v.content + i}
        onClick={(e) => {
          setClickedMainInput(v);
          e.stopPropagation();
          setNow(i);
          changeAvailableIcon("image");
        }}
      >
        <div>
          {v.content == "" ? (
            v.filepath == "" ? (
              <div className="image-default-telegram">이미지 없음</div>
            ) : (
              <img className="image-preview-telegram" src={v.filepath} />
            )
          ) : (
            <img className="image-preview-telegram" src={v.content} />
          )}
        </div>
      </div>
      <div
        className="tool-delete delete-image"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default ImagePreview;
