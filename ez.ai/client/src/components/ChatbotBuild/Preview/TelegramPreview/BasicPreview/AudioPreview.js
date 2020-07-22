import React from "react";

const AudioPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon,
}) => {
  return (
    <div className="main-preview">
      <div
        className={
          now === i
            ? "main-content audiobox-telegram now"
            : "main-content audiobox-telegram"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("audio");
        }}
      >
        {" "}
        <div>
          <i className="fas fa-play fa-lg file-icon-telegram"></i>
          <div className="file-content-telegram">
            <div className="file-name" data-filetype="">
              {v.content}
            </div>
            <div className="file-size" data-filetype="">
              {/* 길이, 용량을 표시하려면 데이터를 확장해야함.현재는 파일 이름만 저장 */}
              {/* 00:00, 00.00 MB{" "} */}
              {v.size}
            </div>
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
