import React, {useState} from "react"

import ButtonTemplateStatus from "./Templates/ButtonTemplateStatus";

const TemplateStatus = (
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
    listCount,
    curListCount,
    setCurListCount,
) => {

    // 템플릿 선택 탭
    const [templateTab, setTemplateTab] = useState("btn")
    const changeTemTab = tab => {
        setTemplateTab(tab);
    }


    return (
        <div className="template-status">
            <div className="template-status-tab">
                <div className={`template-status-tab-btn ${templateTab === "caro" && "tactive"}`} onClick={() => changeTemTab("caro")}>Carousel 템플릿</div>
                <div className={`template-status-tab-btn ${templateTab === "icaro" && "tactive"}`} onClick={() => changeTemTab("icaro")}>Image Carousel 템플릿</div>
            </div>
            <div className="template-status-section">
                {templateTab === "btn" ? (
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
                ) : (
                    <div className="template-section-none">원하는 템플릿을 선택해주세요</div>
                )}
            </div>
        </div>
    )
}

export default TemplateStatus;