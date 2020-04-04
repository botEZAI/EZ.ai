import React from "react"
import GoogleMapPresenter from "../../api/GoogleMapPresenter";

const LocationPreview = ({
  v,
  i,
  setClickedMainInput,
  setNow,
  onDelete
}) => {
  return(
    <div className="main-content main-locabox" key={v.content + i}>
      {" "}
      <div
        onClick={() => {
          setClickedMainInput(v);
          setNow(i);
        }}
      >
        <GoogleMapPresenter />
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