import React from "react";

const ListPreview = ({
  v,
  i,
  setVirtualKeyboard,
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
          now == i
            ? "main-content listbox-line now"
            : "main-content listbox-line"
        }
        key={v.listContent + i}
        onClick={(e) => {
          e.stopPropagation();
          setVirtualKeyboard(true);
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("list");
        }}
      >
        <div className="listbox-header-line" title="고정메뉴">
          <i className="far fa-keyboard"></i>
        </div>
      </div>
      <div
        className="tool-delete delete-listbox "
        onClick={() => {
          onDelete(v.id, "list");
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default ListPreview;
