import React from "react";
import "./KeywordPopUp.css";


const KeywordPopUp = () => {
    const keywords = ["asadddddddddddddddddddddddddddd", "b", "c"];
    const keywordList = keywords.map((keyword, index) => (
        <div className="keyword-list" key={index}>
            {keyword}
        </div>
    ));
    return (
        <div className="keyword-popup">
            <div className="keyword-name">
                keyword 목록
            </div>
            {keywordList}
        </div>
    )
}






export default KeywordPopUp;