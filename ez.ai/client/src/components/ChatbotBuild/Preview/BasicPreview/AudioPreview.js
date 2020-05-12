import React from "react"

const AudioPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete
}) => {
  return (
    <div 
      className={now == i ? "main-content main-audiobox now" 
                          : "main-content main-audiobox"} 
      key={v.content + i}
    >
      {" "}
      <div
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
        }}
      >
        <i className="fas fa-play fa-lg main-file-icon"></i>
        <div className="main-file-content">
          <div className="main-file-name" data-filetype="">
            {v.content}
          </div>
          <div className="main-file-size" data-filetype="">
            {/* 길이, 용량을 표시하려면 데이터를 확장해야함.현재는 파일 이름만 저장 */}
            {/* 00:00, 00.00 MB{" "} */}
          </div>
        </div>
      </div>
      <div
        className="tool-delete delete-audio"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default AudioPreview;