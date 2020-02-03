import React from 'react';
import './BotItem.css';

const BotItem = (props) => {

    const{children,onRemove}=props;

    return(
        <div className="bot-item">
            <div className="text">{children}</div>
            <div className="sns-icons-container">
                <span className="icon-Kakao"> </span>
                <span className="icon-Line"></span>
                <span className="icon-Facebook"></span>
                <span className="icon-Telegram"></span> 
            </div>
            <div className="delete" onClick={(e) => {
                onRemove();
            }}>삭제</div>
        </div>
    );
}

export default BotItem;