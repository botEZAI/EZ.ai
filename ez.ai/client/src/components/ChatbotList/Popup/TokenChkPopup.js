import React from 'react';
import './Popup.css';

const TokenChkPopup = ({isOpen, close, botToken, setBotToken, next, finish}) => {

    const undoToTokenInput = () => { // 토큰 확인 이전으로 돌아갈 경우
        setBotToken({token:""})
        next('tokenInput');
    }
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close}></div>
                    <div className="popup">
                        <p className="popup-title">토큰체크팝업</p>

                        <div className="popup-content">
                            <div className="txt-name-in-popup">
                                Token 확인 
                            </div>
                            <div className="tokenVal">
                                {botToken.token}
                            </div>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={undoToTokenInput}>이전</button>
                            <button onClick={finish}>완료</button>
                        </div>
                    </div>
                </React.Fragment>
                :
                null
            }
        </React.Fragment>

    )
}

export default TokenChkPopup;