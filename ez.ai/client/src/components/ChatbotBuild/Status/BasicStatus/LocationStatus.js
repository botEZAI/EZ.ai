import React, { useState } from "react";
import produce from "immer";
import GoogleMapPresenter from "../../api/GoogleMapPresenter";
import Map from "../../api/Map";
import PlacesAutocomplete2 from "../../api/PlacesAutocomplete2";

const LocationStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index,
  google,
}) => {
  const [mapPopup, setMapPopup] = useState(true);

  return (
    <div className="status-input status-location">
      {/* {mapPopup && (
        <div>
          <Map
            google={google}
            center={{ lat: 37.555185, lng: 126.971315 }}
            width="500px"
            height="400px"
            zoom={15}
          />
        </div>
      )} */}
      {/* <input
        className="status-location-search"
        placeholder="주소를 입력하세요."
      /> */}
      <PlacesAutocomplete2
        keywordObject={keywordObject}
        setKeywordObject={setKeywordObject}
        index={index}
        now={now}
      />
      <GoogleMapPresenter
        keywordObject={keywordObject}
        setKeywordObject={setKeywordObject}
        index={index}
        now={now}
      />
      {/* <div className="status-input status-location-input">
        <input
          placeholder="장소 이름을 적어주세요"
          value={keywordObject[index].contents[now].title || ""}
          onChange={(e) => {
            setKeywordObject(
              produce(keywordObject, (draft) => {
                draft[index].contents[now].title = e.target.value;
              })
            );
          }}
        />
        <input
          placeholder="latitude(위도)"
          value={keywordObject[index].contents[now].latitude || ""}
          onChange={(e) => {
            setKeywordObject(
              produce(keywordObject, (draft) => {
                draft[index].contents[now].latitude = e.target.value;
              })
            );
          }}
        />
        <input
          placeholder="longtitude(경도)"
          value={keywordObject[index].contents[now].longtitude || ""}
          onChange={(e) => {
            setKeywordObject(
              produce(keywordObject, (draft) => {
                draft[index].contents[now].longtitude = e.target.value;
              })
            );
          }}
        />
      </div> */}
      {/* <div style={{ margin: "100px" }}>
        <Map
          google={google}
          center={{ lat: 18.5204, lng: 73.8567 }}
          height="300px"
          zoom={15}
        />
      </div> */}
    </div>
  );
};

export default LocationStatus;
