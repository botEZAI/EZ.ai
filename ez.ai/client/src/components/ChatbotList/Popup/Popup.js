import React,{useState} from 'react';
import './Popup.css';

const Popup = ({
    isOpen,
    close, 
    next,
    botName,
    botDesc,
    botConnect,
    setBotName,
    setBotDesc,
    setBotConnect }) => {
    const [checkError, setCheckError] = useState(false);
    const onChangeBotName = (e) => {
        e.preventDefault();
        setBotName({name:e.target.value});
    }
    const onChangeBotDesc = (e) => {
        e.preventDefault();
        setBotDesc({desc:e.target.value});
    }
    const onChangeBotSns = (e) => { //한 챗봇 당 하나의 소셜 계정만 연동
        setCheckError(false);
        setBotConnect({sns:e.target.value});
    }
    const isBotProfileEmpty = () => { // 봇 정보 미 입력시 alert 
        if(botName.name === "" && botDesc.desc === ""){
            alert("봇 정보를 기입해주세요.");
        }else if(botName.name === ""){
            alert("봇 이름을 입력해주세요.");
        }else if(botDesc.desc === ""){
            alert("봇 설명을 입력해주세요.");
        }else if(botConnect.sns === ""){
            return setCheckError(true);
        }
        else{
            next('tokenInput');
        }
    }
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close}></div>
                    <div className="popup">
                        <p className="popup-title">새로운 챗봇 생성</p>

                        <div className="popup-content">
                            <div className="botname-input">
                                <div className="txt-name-in-popup">ChatbotName</div>
                                <input type="text" onChange = {onChangeBotName}  />
                            </div>
                            <div className="botdesc-input">
                                <div className="txt-desc-in-popup">description</div>
                                <textarea cols="60" onChange = {onChangeBotDesc}/>
                            </div>
                            <div className="platform-select">
                                <div className="txt-sns-in-popup">Platform</div>
                                <div className="sns-icons-container-in-popup">
                                    <span className="icon-Kakao"></span>
                                    <span className="icon-Line"></span>
                                    <span className="icon-Facebook"></span>
                                    <span className="icon-Telegram"></span> 
                                </div>
                                <div className="sns-select-container">
                                    <input data-tooltip-text="카카오톡" type="radio" id="kakao" value="kakao" name="sns" onChange={onChangeBotSns}/>
                                    <input data-tooltip-text="네이버 Line" type="radio" id="line" value="line" name="sns" onChange={onChangeBotSns}/>
                                    <input data-tooltip-text="페이스북" type="radio" id="facebook" value="facebook" name="sns" onChange={onChangeBotSns}/>
                                    <input data-tooltip-text="텔레그램" type="radio" id="telegram" value="telegram" name="sns" onChange={onChangeBotSns}/>
                                </div>
                                {checkError && <div className="checkError" style={{color:'red'}}>플랫폼을 선택해주세요.</div>}
                            </div>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={close}>취소</button>
                            <button onClick={isBotProfileEmpty}>다음</button>
                        </div>
                    </div>
                </React.Fragment>
                :
                null
            }
        </React.Fragment>
    )
};

export default Popup;