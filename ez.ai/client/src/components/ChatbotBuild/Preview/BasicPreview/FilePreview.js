import React from "react"

const FilePreview = ({
  v,
  i,
  setClickedMainInput,
  setNow,
  onDelete
}) => {
  return(
    <div className="main-content main-filebox" key={v.content + i}>
      {" "}
      <div
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
        }}
      >
        <i className="fas fa-file fa-lg main-file-icon"></i>
        <div className="main-file-content">
          <div className="main-file-name" data-filetype="">
            {v.content}
          </div>
          <div className="main-file-size" data-filetype="">
            {/* 00.00 MB */}
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