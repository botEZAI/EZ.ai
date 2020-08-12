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
            ? "main-content imgbox-line now"
            : "main-content imgbox-line"
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
          {v.content !== "" ? (
            <img className="image-preview-line" src={v.content} />
          ) : (
            <div className="image-default-line">이미지 없음</div>
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
