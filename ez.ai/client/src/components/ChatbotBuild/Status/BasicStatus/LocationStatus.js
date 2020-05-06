import React from "react";
import produce from "immer";
import GoogleMapPresenter from "../../api/GoogleMapPresenter";

const LocationStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index
}) => {
  return (
    <>
      <div className="status-input status-location">
        <p>임시 - 추후 지도 API로 연동</p>
        <input
          placeholder="장소 이름을 적어주세요"
          value={keywordObject[index].contents[now].title || ""}
          onChange={e => {
            setKeywordObject(
              produce(keywordObject, draft => {
                draft[index].contents[now].title = e.target.value;
              })
            );
          }}
        />
        <input
          placeholder="latitude(위도)"
          value={keywordObject[index].contents[now].latitude || ""}
          onChange={e => {
            setKeywordObject(
              produce(keywordObject, draft => {
                draft[index].contents[now].latitude = e.target.value;
              })
            );
          }}
        />
        <input
          placeholder="longtitude(경도)"
          value={keywordObject[index].contents[now].longtitude || ""}
          onChange={e => {
            setKeywordObject(
              produce(keywordObject, draft => {
                draft[index].contents[now].longtitude = e.target.value;
              })
            );
          }}
        />
      </div>
      <GoogleMapPresenter />;
    </>
  );
};

export default LocationStatus;
