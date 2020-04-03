import React from "react"

const ListPreview = ({
  v,
  i,
  setVirtualKeyboard,
  setClickedMainInput,
  setNow,
  onDelete
}) => {
  return(
    <div
      className="main-content main-listbox"
      key={v.listContent + i}
      onClick={e => {
        e.stopPropagation();
        setVirtualKeyboard(true);
      }}
    >
      {" "}
      <div
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
        }}
      >
        <div className="main-listbox-header">Question</div>
        <div className="main-listbox-question">
          {v.listContent.question !== ""
            ? v.listContent.question
            : "(Ask a question)"}
        </div>
        <div className="main-listbox-elem">
          {v.listContent.elem[0]}
        </div>
        {v.listContent.elem[1] && (
          <div className="main-listbox-elem">
            {v.listContent.elem[1]}
          </div>
        )}
        {v.listContent.elem[2] && (
          <div className="main-listbox-elem">
            {v.listContent.elem[2]}
          </div>
        )}
        {v.listContent.elem[3] && (
          <div className="main-listbox-elem">
            {v.listContent.elem[3]}
          </div>
        )}
        {v.listContent.elem[4] && (
          <div className="main-listbox-elem">
            {v.listContent.elem[4]}
          </div>
        )}
        {v.listContent.elem[5] && (
          <div className="main-listbox-elem">
            {v.listContent.elem[5]}
          </div>
        )}
        {v.listContent.elem[6] && (
          <div className="main-listbox-elem">
            {v.listContent.elem[6]}
          </div>
        )}
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