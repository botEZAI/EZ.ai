import React from "react";
import produce from "immer";
import KeywordPopUp from "../../KeywordPopUp";



const KeyboardStatus = ({
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
}) => {

    const showKeywordPopUp = e => {
        console.log("works");
        return <KeywordPopUp />;
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
                    <tr>
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[0] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[0] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div
                                className="list-keyword-btn"
                                onClick={showKeywordPopUp}
                            >
                                키워드 연동
                            </div>
                        </div>
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[1] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[1] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div className="list-keyword-btn">키워드 연동</div>
                        </div>
                    </tr>
                    <tr>
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[2] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[2] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div className="list-keyword-btn">키워드 연동</div>
                        </div>
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[3] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[3] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div className="list-keyword-btn">키워드 연동</div>
                        </div>
                    </tr>
                    <tr>
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[4] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[4] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div className="list-keyword-btn">키워드 연동</div>
                        </div>
                        <div className="status-list-content">
                            <input
                                placeholder="키워드명을 적어주세요"
                                value={currentContent.elem[5] || ""}
                                onChange={e => {
                                    setKeywordObject(
                                        produce(keywordObject, draft => {
                                            draft[index].contents[now].content.elem[5] =
                                                e.target.value;
                                        })
                                    );
                                }}
                            />
                            <div className="list-keyword-btn">키워드 연동</div>
                        </div>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default KeyboardStatus;