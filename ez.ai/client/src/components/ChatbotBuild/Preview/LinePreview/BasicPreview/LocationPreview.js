import React from "react";
import GoogleMapPresenter from "../../../api/GoogleMapPresenter";
import produce from "immer";
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
            ? "main-content locationbox-telegram now"
            : "main-content locationbox-telegram"
        }
        key={v.content + i}
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
          changeAvailableIcon("location");
        }}
      >
        {" "}
        {/* <div>
          <GoogleMapPresenter
            keywordObject={keywordObject}
            setKeywordObject={setKeywordObject}
            index={index}
            now={now}
          />
        </div> */}
        <div>
          <GoogleMapPresenter
            keywordObject={keywordObject}
            setKeywordObject={setKeywordObject}
            index={index}
            now={i}
          ></GoogleMapPresenter>
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
