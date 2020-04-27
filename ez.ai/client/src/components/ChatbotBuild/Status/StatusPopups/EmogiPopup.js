import React, {useState} from "react";
import produce from "immer";
import "./EmogiPopup.css";


const EmogiPopup = ({
                        setKeywordObject,
                        keywordObject,
                        now,
                        index,
                        selectType,
                    }) => {
    const [showImoPopup, setShowImoPopup] = useState(false);
    const [imoNow, setImoNow] = useState("emoji-1");

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

    const emogi_2 = [
        `\u{1F680}`,`\u{1F683}`,`\u{1F684}`,`\u{1F685}`,`\u{1F687}`,
        `\u{1F689}`,`\u{1F68C}`,`\u{1F68F}`,`\u{1F691}`,`\u{1F692}`,
        `\u{1F693}`,`\u{1F695}`,`\u{1F697}`,`\u{1F699}`,`\u{1F69A}`,
        `\u{1F6A2}`,`\u{1F6A4}`,`\u{1F6A5}`,`\u{1F6A7}`,`\u{1F6A8}`,
        `\u{1F6A9}`,`\u{1F6AA}`,`\u{1F6AB}`,`\u{1F6AC}`,`\u{1F6AD}`,
        `\u{1F6B2}`,`\u{1F6B6}`,`\u{1F6B9}`,`\u{1F6BA}`,`\u{1F6BB}`,
        `\u{1F6BC}`,`\u{1F6BD}`,`\u{1F6BE}`,`\u{1F6C0}`
    ]


    const showImoView = () => {
        if (showImoPopup === false){
            setShowImoPopup(!showImoPopup);
        }

    };

    const imoTab = e => {
        setImoNow(e.currentTarget.getAttribute('value'));
    };

    const selectEmo = e => {
        setShowImoPopup(!showImoPopup);
        if (e.target.innerHTML.length === 2) {
            setKeywordObject(
                produce(keywordObject, draft => {
                    if (selectType === "text") {
                        draft[index].contents[now].content += e.target.innerHTML;
                    }
                    else if (selectType === "keyword"){
                        draft[index].contents[now].listContent.question += e.target.innerHTML;

                    }

                })
            );
        }

    };

    const emogi1List = emogi_1.map((emogi) => (<div className="emoji-text"><p>{emogi}</p></div>));
    const emogi2List = emogi_2.map((emogi) => (<div className="emoji-text"><p>{emogi}</p></div>));

    
    return (
        <>
            <div
                className="extra-btn emoji"
                onClick={showImoView}
            >
                이모지
                { showImoPopup ?
                    <div className="emoji-interface" >
                        <ul className = "emoji-tab">
                            <li value="emoji-1" onClick={imoTab}><p>{emogi_1[0]}</p></li>
                            <li value="emoji-2" onClick={imoTab}><p>{emogi_2[0]}</p></li>
                        </ul>
                        <div onClick={selectEmo}>
                        { imoNow === "emoji-1" ?
                            <>
                                {emogi1List}
                            </>
                            : imoNow === "emoji-2" ?
                                <>
                                    {emogi2List}
                                </>
                            : null }
                        </div>
                    </div>
                : null }
            </div>
        </>
    )
}

export default EmogiPopup;