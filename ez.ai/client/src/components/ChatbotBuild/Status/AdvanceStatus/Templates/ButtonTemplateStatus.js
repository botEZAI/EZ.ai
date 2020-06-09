import React, {useState} from "react";
import produce from "immer";
import "./ButtonTemplateStatus.css";



const ButtonTemplateStatus = (
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
        <div className="btn-template-status">
            <div className="btn-template-size">
                <div className="btn-template-size-rectangle">
                    <i className="far fa-square"></i>
                </div>
                <div className="btn-template-size-sqaure">
                    <i className="far fa-square"></i>
                </div>
            </div>
            <div className="btn-template-status-main">
                <div className="btn-template-thumbnail">
                    <i className="fas fa-upload"></i>
                </div>
                <div className="btn-template-contents">
                    <div className="btn-template-title">타이틀</div>
                    <div className="btn-template-text">텍스트입니다</div>
                    <div className="btn-template-actions">
                        <div className="btn-template-action">
                            <div className="btn-action-label">첫번째 액션</div>
                            <div className="btn-action-remove">
                                <i className="fas fa-minus-circle"></i>
                            </div>
                        </div>
                        <div className="btn-template-action">
                            <div className="btn-action-label">2번째 액션</div>
                            <div className="btn-action-remove">
                                <i className="fas fa-minus-circle"></i>
                            </div>
                        </div>
                        <div className="btn-template-action">
                            <div className="btn-action-label">3번째 액션</div>
                            <div className="btn-action-remove">
                                <i className="fas fa-minus-circle"></i>
                            </div>
                        </div>
                        <div className="btn-action-add">
                            <div className="add-btn">
                                action 추가
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ButtonTemplateStatus