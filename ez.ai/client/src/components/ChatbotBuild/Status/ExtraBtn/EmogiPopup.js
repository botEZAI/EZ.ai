import React, {useState} from "react";
import produce from "immer";


const EmogiPopup = (
    setKeywordObject,
    keywordObject,
    now,
    index,
) => {
    const [showImoPopup, setShowImoPopup] = useState(false);

    const emogi_1 = [
        `\u{1F601}`, `\u{1F602}`, `\u{1F603}`, `\u{1F604}`, `\u{1F605}`,
        `\u{1F606}`, `\u{1F609}`, `\u{1F60A}`, `\u{1F60B}`, `\u{1F60C}`,
        `\u{1F60D}`, `\u{1F60F}`, `\u{1F612}`, `\u{1F613}`, `\u{1F614}`,
        `\u{1F616}`, `\u{1F618}`, `\u{1F61A}`, `\u{1F61C}`, `\u{1F61D}`,
        `\u{1F61E}`, `\u{1F620}`, `\u{1F621}`, `\u{1F622}`, `\u{1F623}`,
        `\u{1F624}`, `\u{1F625}`, `\u{1F628}`, `\u{1F629}`, `\u{1F62A}`,
        `\u{1F62B}`, `\u{1F62D}`, `\u{1F630}`, `\u{1F631}`, `\u{1F632}`,
        `\u{1F633}`, `\u{1F635}`, `\u{1F637}`, `\u{1F638}`, `\u{1F639}`,
        `\u{1F63A}`, `\u{1F63B}`, `\u{1F63C}`, `\u{1F63D}`, `\u{1F63E}`,
        `\u{1F63F}`, `\u{1F640}`, `\u{1F645}`, `\u{1F646}`, `\u{1F647}`,
        `\u{1F648}`, `\u{1F649}`, `\u{1F64A}`, `\u{1F64B}`, `\u{1F64C}`,
        `\u{1F64D}`, `\u{1F64E}`,
    ]

    const showImoView = () => {
        if (showImoPopup == false) {
            setShowImoPopup(!showImoPopup);
        }
    };

    const selectEmo = e => {
        setShowImoPopup(!showImoPopup);
        setKeywordObject(
            produce(keywordObject, draft => {
                draft[index].contents[now].content += e.target.innerHTML;
            })
        );
        console.log(e.target.innerHTML, keywordObject);
    };

    const emogi1List = emogi_1.map((emogi) => (<div className="emogi-text" onClick={selectEmo}><p>{emogi}</p></div>));


    
    return (
        <>
            <div
                className="extra-btn emoji"
                onClick={showImoView}
            >
                이모지
                { showImoPopup ?
                    <div className="emoji-interface">
                        <ul class = "emoji-tab">
                            <li className = "active" label="emoji-preview-1"><p>{emogi_1[0]}</p></li>
                        </ul>
                        <div className="emogi-1">
                            {emogi1List}
                        </div>
                    </div>
                : null }
            </div>
        </>
    )
}

export default EmogiPopup;