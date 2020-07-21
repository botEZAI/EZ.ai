import React, { useRef } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import produce from "immer";
import "./GoogleMapPresenter.css";

export const GoogleMapPresenter = ({
  google,
  keywordObject,
  setKeywordObject,
  index,
  now,
  i,
}) => {
  const mapRef = useRef(null);
  const onClickMap = (e, aug, geo) => {
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].latitude = geo.latLng.lat();
        draft[index].contents[now].longtitude = geo.latLng.lng();
      })
    );
  };

  return (
    <>
      <div className={"GoogleMapPresenter"}>
        <Map
          ref={mapRef}
          google={google}
          zoom={17}
          initialCenter={{
            lat:
              (keywordObject[index].contents[now] &&
                keywordObject[index].contents[now].latitude) ||
              37.555185,
            lng:
              (keywordObject[index].contents[now] &&
                keywordObject[index].contents[now].longtitude) ||
              126.971315,
          }}
          // onClick={onClickMap}
        >
          <Marker
            position={{
              lat:
                (keywordObject[index].contents[now] &&
                  keywordObject[index].contents[now].latitude) ||
                37.555185,
              lng:
                (keywordObject[index].contents[now] &&
                  keywordObject[index].contents[now].longtitude) ||
                126.971315,
            }}
          />
        </Map>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyChO_3v49N1EAjizquBb467naDMj8E0Eu8",
})(GoogleMapPresenter);
