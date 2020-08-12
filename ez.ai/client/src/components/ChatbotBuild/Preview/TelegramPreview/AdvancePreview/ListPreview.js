import React from "react"

const ListPreview = ({
  v,
  i,
  setVirtualKeyboard,
  setClickedMainInput,
  now,
  setNow,
  onDelete,
  changeAvailableIcon
}) => {
  return(
      <div className="main-preview">
        <div
          className={now == i ? "main-content listbox-telegram now"
                              : "main-content listbox-telegram"}
          key={v.listContent + i}
          onClick={e => {
            e.stopPropagation();
            setVirtualKeyboard(true);
            setClickedMainInput(v);
            setNow(i);
            changeAvailableIcon("list");
          }}
        >
          <div className="listbox-header-telegram" title = "고정메뉴"><i className="far fa-keyboard"></i></div>
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