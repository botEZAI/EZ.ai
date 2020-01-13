import React from 'react';
import './InputBot.css';

const InputBot= ({onInsert}) => {
   return(
       <div className="input-bot">
            <div className="add-button" onClick={onInsert}> + 새로운 챗봇 생성</div>
       </div>
   )
};
export default InputBot;