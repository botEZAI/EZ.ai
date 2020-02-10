import React from 'react';
import './TokenPopup.css';

const TokenPopup = ({isOpen, close, next, setBotName, setBotDesc, setBotConnect, botToken, setBotToken}) => {
    const onChangeToken = e => { // 토큰 입력 처리
        setBotToken({token:e.target.value});
      };
    const isTokenEmpty = () => { //토큰 미입력 예외처리
        if(botToken.token === ""){
            alert("토큰을 입력해주세요.");
        }else{
            next('tokenChk');
        }
    }
    const undoToBotProfile = () =>{ // 봇 이름, desc, sns 입력 단계로 되돌아가기
        setBotName({name:""});
        setBotDesc({desc:""});
        setBotConnect({sns:""});
        next('first');
    }
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close}></div>
                    <div className="tokenPopup">
                        <p className="tokenPopup-title">토큰 팝업</p>
                        <div className="tokenPopup-content" >
                            <div>Token 입력</div>
                            <input type="text" onChange = {onChangeToken}/>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={undoToBotProfile}>이전</button>
                            <button onClick={isTokenEmpty}>다음</button>
                        </div>
                    </div>
                </React.Fragment>
                :
                null
            }
        </React.Fragment>
    )
}

export default TokenPopup;