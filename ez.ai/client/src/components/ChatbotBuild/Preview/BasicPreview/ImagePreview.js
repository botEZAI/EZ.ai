import React from 'react'

const ImagePreview = ({
  v,
  i,
  setClickedMainInput,
  setNow,
  onDelete
}) => {
  return (
    <div
      className="main-content main-imgbox"
      key={v.content + i}
      style={{ padding: "1%" }}
    >
      <div
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
        }}
      >
        {" "}
        {v.content !== "" ? (
          <div
            className="main-image-preview"
            style={{ backgroundImage: `url(${v.content})` }}
          ></div>
        ) : (
          <div className="image-preview-default">이미지 없음</div>
        )}
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