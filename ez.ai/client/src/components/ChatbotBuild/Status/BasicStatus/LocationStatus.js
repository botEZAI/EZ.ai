import React from "react";
import produce from "immer";
import GoogleMapPresenter from "../../GoogleMapPresenter";

const LocationStatus = ({
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
}) => {
    return (
        <>
            <div className="status-input status-location">
                <p>임시 - 추후 지도 API로 연동</p>
                <input
                    placeholder="장소 이름을 적어주세요"
                    value={currentContent.title || ""}
                    onChange={e => {
                        setKeywordObject(
                            produce(keywordObject, draft => {
                                draft[index].contents[now].content.title =
                                    e.target.value;
                            })
                        );
                    }}
                />
                <input
                    placeholder="latitude(위도)"
                    value={currentContent.latitude || ""}
                    onChange={e => {
                        setKeywordObject(
                            produce(keywordObject, draft => {
                                draft[index].contents[now].content.latitude =
                                    e.target.value;
                            })
                        );
                    }}
                />
                <input
                    placeholder="longtitude(경도)"
                    value={currentContent.longtitude || ""}
                    onChange={e => {
                        setKeywordObject(
                            produce(keywordObject, draft => {
                                draft[index].contents[now].content.longtitude =
                                    e.target.value;
                            })
                        );
                    }}
                />
            </div>
            <GoogleMapPresenter />;
        </>
    )
}

export default LocationStatus;