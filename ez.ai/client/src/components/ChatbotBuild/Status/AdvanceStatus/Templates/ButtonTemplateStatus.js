import React, {useState} from "react";
import produce from "immer";
import KeywordPopUp from "../../StatusPopups/KeywordPopUp";



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
    const [showPopup, setShowPopup] = useState(false);
    const [popNum, setPopNum] = useState("-1");


    const toggleKeywordPopUp = (i, e) => {
        setPopNum(i);
        setShowPopup(!showPopup);
    };

    const changeListLength = (i) => {
        setCurListCount(listCount[i - 1]);
        setKeywordObject(
            produce(keywordObject, (draft) => {
                draft[index].contents[now].listContent.keywordLen = i;
            })
        );
    };

    return (
        <div className="status-input status-list">
            <textarea
                placeholder="작성하고자 하는 텍스트를 적어주세요"
                /*
                value={keywordObject[index].contents[now].listContent.question || ""}
                onChange={(e) => {
                    setKeywordObject(
                        produce(keywordObject, (draft) => {
                            draft[index].contents[now].listContent.question =
                                e.target.value;
                        })
                    );
                }} */
            ></textarea>
        </div>


    )
}

export default ButtonTemplateStatus