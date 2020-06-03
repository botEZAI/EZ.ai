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
          {" "}
          <div>
            <div className="listbox-header-telegram">Question</div>
            <div className="listbox-question-telegram">
              {v.listContent.question !== ""
                ? v.listContent.question
                : "(Ask a question)"}
            </div>
            {v.listContent.elem.map((i) => (
              v.listContent.elem[i] && 
                <div className="listbox-elem-telegram">
                  {v.listContent.elem[i]}
                </div>
            ))}
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