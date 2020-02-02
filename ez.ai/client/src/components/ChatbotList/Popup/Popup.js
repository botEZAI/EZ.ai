import React from 'react';
import './Popup.css';

const Popup = ({isOpen, close, next}) => {
    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close}></div>
                    <div className="popup">
                        <p className="popup-title">새로운 챗봇 생성</p>

                        <div className="popup-content">
                            <p className="botname-input">
                                Chatbot Name <br /> <input type="text" />
                            </p>
                            <p className="desc-input">
                                description  <br /> <textarea cols="60" />
                            </p>
                            <p>
                                Platform
                            </p>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={close}>취소</button>
                            <span></span> 
                            <button onClick={() => next('tokenInput')}>다음</button>
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