import React from 'react';
import './Popup.css';

const Popup = ({isOpen, close}) => {

    return(
        <React.Fragment>
            {
                isOpen ?
                <React.Fragment>
                    <div className="popup-overlay" onClick={close} />
                    <div className="popup">
                        <p className="popup-title">Modal Title</p>
                        <div className="popup-content">
                            <p>
                                Chatbot Name : <input type="text" />
                            </p>
                            <p>
                                description: <input type="text" />
                            </p>
                            <p>
                                SNS 
                            </p>
                        </div>
                        <div className="popup-button-wrap">
                            <button onClick={close}>다음</button>
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