import React from "react";
import produce from "immer";
import GoogleMapPresenter from "../../api/GoogleMapPresenter";

const LocationStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index,
}) => {
  return (
    <div className="status-input status-location">
      <input
        className="status-location-search"
        placeholder="주소를 입력하세요."
      />
      <GoogleMapPresenter
        keywordObject={keywordObject}
        setKeywordObject={setKeywordObject}
        index={index}
        now={now}
      />
      <div className="status-input status-location-input">
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
      </div>
    </div>
  );
};

export default LocationStatus;
