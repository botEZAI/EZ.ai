import React from "react";

const TextPreview = ({
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
            ? "main-content textbox-telegram now"
            : "main-content textbox-telegram"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("text");
        }}
      >
        <div>{v.content || ""}</div>
      </div>
      <div
        className="tool-delete delete-text"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default TextPreview;
