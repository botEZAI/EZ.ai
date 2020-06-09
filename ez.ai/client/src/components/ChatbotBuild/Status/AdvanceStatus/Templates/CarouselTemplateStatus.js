import React, {useState} from "react";
import "./CarouselTemplateStatus.css";
import ButtonTemplateStatus from "./ButtonTemplateStatus";

const CarouselTemplateStatus = (
    currentContent,
        setKeywordObject,
        keywordObject,
        now,
        index,
        listCount,
        curListCount,
        setCurListCount,
) => {
    return (
        <div className="carosuel-template-status">
            <ButtonTemplateStatus
                currentContent={currentContent}
                setKeywordObject={setKeywordObject}
                keywordObject={keywordObject}
                now={now}
                index={index}
                listCount={listCount}
                curListCount={curListCount}
                setCurListCount={setCurListCount}
            />

            <ButtonTemplateStatus
                currentContent={currentContent}
                setKeywordObject={setKeywordObject}
                keywordObject={keywordObject}
                now={now}
                index={index}
                listCount={listCount}
                curListCount={curListCount}
                setCurListCount={setCurListCount}
            />

            <ButtonTemplateStatus
                currentContent={currentContent}
                setKeywordObject={setKeywordObject}
                keywordObject={keywordObject}
                now={now}
                index={index}
                listCount={listCount}
                curListCount={curListCount}
                setCurListCount={setCurListCount}
            />

            <div className="btn-template-status-main-add">슬라이드 추가하기</div>
        </div>
    )
};

export default CarouselTemplateStatus;