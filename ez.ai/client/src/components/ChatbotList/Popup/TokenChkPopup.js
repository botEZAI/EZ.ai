import React from 'react';
import './TokenChkPopup.css';

const TokenChkPopup = ({isOpen, close, next, finish}) => {
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close}></div>
                    <div className="tokenChk">
                        <p className="tokenChk-title">토큰체크팝업</p>

                        <div className="tokenChk-content">
                            <p className="botname-input">
                                Token 확인 <br /> <input type="text" />
                            </p>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={() => next('tokenInput')}>이전</button>
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