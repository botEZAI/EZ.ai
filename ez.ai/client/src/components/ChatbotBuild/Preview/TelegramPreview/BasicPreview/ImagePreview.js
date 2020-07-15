import React from 'react'

const ImagePreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon
}) => {
  return (
      <div className="main-preview">
        <div
            className={now === i ? "main-content imgbox-telegram now"
                : "main-content imgbox-telegram"}
            key={v.content + i}
            onClick={(e) => {
                setClickedMainInput(v);
                e.stopPropagation();
                setNow(i);
                changeAvailableIcon("image");
            }}
        >
            <div>
                {" "}
                {v.content !== "" ? (
                    <div
                        className="image-preview-telegram"
                        style={{ backgroundImage: `url(${v.content})` }}
                    ></div>
                ) : (
                    <div className="image-default-telegram">이미지 없음</div>
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