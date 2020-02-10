import React from 'react';
import './TokenPopup.css';

const TokenPopup = ({isOpen, close, next}) => {
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close}></div>
                    <div className="tokenPopup">
                        <p className="tokenPopup-title">토큰 팝업</p>

                        <div className="tokenPopup-content">
                            <p className="token-input">
                                Token 입력 <br /> <input type="text" />
                            </p>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={() => next('first')}>이전</button>
                            <button onClick={() => next('tokenChk')}>다음</button>
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