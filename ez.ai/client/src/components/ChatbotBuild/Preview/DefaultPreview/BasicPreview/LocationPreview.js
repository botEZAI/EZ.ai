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
}) => {
  return (
    <div className="main-preview">
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
