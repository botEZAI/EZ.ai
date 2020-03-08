import React from "react";
import "./KeywordPopUp.css";


const KeywordPopUp = ({
    keywordObject,
    keywordPopup,
    setKeywordPopup,
    keywordPop,
}) => {
    const setListKeyword = (e) => {
        let newKeywordPopup = keywordPopup;
        newKeywordPopup[keywordPop.id] = {id : keywordPop.id, value: e.target.getAttribute('label')};
        setKeywordPopup(newKeywordPopup);
    }

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
                    onClick={setListKeyword}
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