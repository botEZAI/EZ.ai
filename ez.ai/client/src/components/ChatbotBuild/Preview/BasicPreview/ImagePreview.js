import React from 'react'

const ImagePreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete
}) => {
  return (
    <div
      className={now == i ? "main-content main-imgbox now" 
                          : "main-content main-imgbox"}
      key={v.content + i}
      style={{ padding: "1%" }}
      onClick={(e) => {
        setClickedMainInput(v);
        e.stopPropagation();
        setNow(i);
      }}
    >
      <div>
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