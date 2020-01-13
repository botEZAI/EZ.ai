import React from 'react';
import './BotItem.css';

const BotItem = (props) => {
    // const searchResult = [
    //     {
    //         id: 1,
    //         loginName: "kakao Chatbot"
    //     },
    //     {
    //         id: 2,
    //         loginName: "naver Chatbot"
    //     },
    //     {
    //         id: 3,
    //         loginName: "Line Chatbot"
    //     },
    //     {
    //         id: 4,
    //         loginName: "facebook Chatbot"
    //     }
    //   ]
    const{children,onRemove}=props;

    return(
        <div className="bot-item">
            <div className="text">{children}</div>
            <div className="snsbtn">
                <span>k</span>
                <span>N</span>
                <span>L</span>
                <span>F</span> 
            </div>
            <div className="delete" onClick={(e) => {
                onRemove();
            }}>삭제</div>
        </div>
    );
}

export default BotItem;