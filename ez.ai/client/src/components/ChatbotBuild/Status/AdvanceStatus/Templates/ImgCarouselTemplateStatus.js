import React, {useState} from "react";


const ImgCarouselTemplateStatus = (
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
        <div className="img-carosuel-template-status">
            <div className="img-carosuel-template-status-content">
                <div className="img-carosuel-template-control">
                    <div className="img-carosuel-template-btn">
                        <i className="far fa-square"></i>
                    </div>
                    <div className="img-carosuel-template-btn">
                        <i className="far fa-square"></i>
                    </div>
                </div>
                <div className="img-carosuel-template-main">
                    <div className="img-carosuel-template-img">
                        <div className="img-carosuel-template-action">액션버튼</div>
                    </div>
                </div>
            </div>

            <div className="img-carosuel-template-status-content">
                <div className="img-carosuel-template-control">
                    <div className="img-carosuel-template-btn">
                        <i className="far fa-square"></i>
                    </div>
                    <div className="img-carosuel-template-btn">
                        <i className="far fa-square"></i>
                    </div>
                </div>
                <div className="img-carosuel-template-main">
                    <div className="img-carosuel-template-img">
                        <div className="img-carosuel-template-action">액션버튼</div>
                    </div>
                </div>
            </div>

            <div className="img-carosuel-template-status-content">
                <div className="img-carosuel-template-control">
                    <div className="img-carosuel-template-btn">
                        <i className="far fa-square"></i>
                    </div>
                    <div className="img-carosuel-template-btn">
                        <i className="far fa-square"></i>
                    </div>
                </div>
                <div className="img-carosuel-template-main">
                    <div className="img-carosuel-template-img">
                        <div className="img-carosuel-template-action">액션버튼</div>
                    </div>
                </div>
            </div>

            <div className="img-carosuel-template-status-content-add">슬라이드 추가하기</div>
        </div>
    )
};

export default ImgCarouselTemplateStatus;