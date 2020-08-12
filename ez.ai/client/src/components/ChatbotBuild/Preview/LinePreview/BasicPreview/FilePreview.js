import React from "react";

const FilePreview = ({
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
      {console.log(platformInfo)}
      <div
        className={
          now === i
            ? "main-content filebox-telegram now"
            : "main-content filebox-telegram"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("file");
        }}
      >
        {" "}
        <div>
          <i className="fas fa-file fa-lg file-icon-telegram"></i>
          <div className="file-content-telegram">
            <div className="file-name" data-filetype="">
              {v.content}
            </div>
            <div className="file-size" data-filetype="">
              {/* 00.00 MB */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="tool-delete delete-file"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default FilePreview;
