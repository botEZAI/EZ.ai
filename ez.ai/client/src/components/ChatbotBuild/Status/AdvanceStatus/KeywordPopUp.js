import React from "react";
import "./KeywordPopUp.css";


const KeywordPopUp = ({
    keywordObject,
}) => {
    return (
        <div className="keyword-popup">
            <div className="keyword-name">
                keyword 목록
            </div>
            {keywordObject.map((keyword, index) => {
                return (
                <div
                    key={index}
                    label = {keyword.keyword}
                    className="keyword-list"
                >
                    {keyword.keyword}
                </div>
                );
            })}
        </div>
    )
}






export default KeywordPopUp;