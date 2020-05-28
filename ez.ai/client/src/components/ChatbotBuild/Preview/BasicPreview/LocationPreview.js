import React from "react";
import GoogleMapPresenter from "../../api/GoogleMapPresenter";

const LocationPreview = ({
  v,
  i,
  setClickedMainInput,
  now,
  setNow,
  keywordObject,
  setKeywordObject,
  index,

  onDelete,
  changeAvailableIcon,
}) => {
  return (
    <div className="main-preview">
      <div
        className={
          now === i
            ? "main-content main-locabox now"
            : "main-content main-locabox"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("location");
        }}
      >
        {" "}
        <div>
          <GoogleMapPresenter
            keywordObject={keywordObject}
            setKeywordObject={setKeywordObject}
            index={index}
            now={now}
          />
        </div>
      </div>

      <div
        className="tool-delete delete-location"
        onClick={() => {
          onDelete(v.id);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default LocationPreview;
