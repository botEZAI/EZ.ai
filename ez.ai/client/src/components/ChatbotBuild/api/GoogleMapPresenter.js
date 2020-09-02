import React, { useRef, useEffect, useState } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import produce from "immer";
import "./GoogleMapPresenter.css";
import { useSelector } from "react-redux";

export const GoogleMapPresenter = ({
  google,
  keywordObject,
  setKeywordObject,
  index,
  now,
  i,
}) => {
  const { currentChatbot } = useSelector((state) => state.chatbot);
  const mapRef = useRef(null);
  const [latitude, setLatitude] = useState(
    keywordObject[index] &&
      keywordObject[index].contents[now] &&
      keywordObject[index].contents[now].latitude
  );
  const [longtitude, setLongtitude] = useState(
    keywordObject[index] &&
      keywordObject[index].contents[now] &&
      keywordObject[index].contents[now].longtitude
  );
  useEffect(() => {
    setLatitude(
      keywordObject[index] &&
        keywordObject[index].contents[now] &&
        keywordObject[index].contents[now].latitude
    );
    setLongtitude(
      keywordObject[index] &&
        keywordObject[index].contents[now] &&
        keywordObject[index].contents[now].longtitude
    );
  }, [
    keywordObject[index] &&
      keywordObject[index].contents[now] &&
      keywordObject[index].contents[now].latitude,
  ]);
  // const onClickMap = (e, aug, geo) => {
  //   setKeywordObject(
  //     produce(keywordObject, (draft) => {
  //       draft[index].contents[now].latitude = geo.latLng.lat();
  //       draft[index].contents[now].longtitude = geo.latLng.lng();
  //     })
  //   );
  // };

  return (
    <>
      {console.log(keywordObject, index, now)}
      <div className={"GoogleMapPresenter"}>
        <Map
          ref={mapRef}
          google={google}
          zoom={17}
          initialCenter={{
            lat: latitude || 37.555185,
            lng: longtitude || 126.971315,
          }}
          center={{ lat: latitude || 37.555185, lng: longtitude || 126.971315 }}
          // onClick={onClickMap}
        >
          <Marker
            position={{
              lat:
                (keywordObject[index] &&
                  keywordObject[index].contents[now] &&
                  keywordObject[index].contents[now].latitude) ||
                37.555185,
              lng:
                (keywordObject[index] &&
                  keywordObject[index].contents[now] &&
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
