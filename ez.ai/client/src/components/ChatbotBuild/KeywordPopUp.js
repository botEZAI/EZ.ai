import React from "react";
import "./KeywordPopUp.css";


const KeywordPopUp = () => {
    const keywords = ["a", "b", "c"];
    const keywordList = keywords.map((keyword, index) => (
        <div className="keyword-list" key={index}>
            {keyword}
        </div>
    ));
    return (
        <div className="keyword-popup">
`           {keywordList}
        </div>
    )
}






export default KeywordPopUp;