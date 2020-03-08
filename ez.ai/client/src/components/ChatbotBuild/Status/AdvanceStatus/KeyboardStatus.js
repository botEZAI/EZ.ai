import React, {useState} from "react";
import produce from "immer";
import KeywordPopUp from "./KeywordPopUp";



const KeyboardStatus = ({
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
    keywordPopup,
    setKeywordPopup,
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popNum, setPopNum] = useState("-1");

    const toggleKeywordPopUp = e => {
        setPopNum(e.target.getAttribute("name"))
        setShowPopup(!showPopup)
    };


    return (
        <>
            <div className="status-input status-list">
                <textarea
                    placeholder="작성하고자 하는 텍스트를 적어주세요"
                    value={currentContent.question || ""}
                    onChange={e => {
                        setKeywordObject(
                            produce(keywordObject, draft => {
                                draft[index].contents[now].content.question =
                                    e.target.value;
                            })
                        );
                    }}
                ></textarea>
                <table>
                    {keywordPopup.map((keywordPop, index) => (
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[keywordPop.id] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[keywordPop.id] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div
                                className="list-keyword-btn"
                                name = {keywordPop.id}
                                onClick={toggleKeywordPopUp}
                            >
                                {keywordPop.value}
                                {showPopup && popNum === keywordPop.id.toString() ?
                                    <KeywordPopUp
                                        keywordObject = {keywordObject}
                                        keywordPopup = {keywordPopup}
                                        setKeywordPopup = {setKeywordPopup}
                                        keywordPop={keywordPop}
                                    />
                                    : null}
                            </div>
                        </div>
                    ))}
                </table>
            </div>
        </>
    )
}

export default KeyboardStatus;