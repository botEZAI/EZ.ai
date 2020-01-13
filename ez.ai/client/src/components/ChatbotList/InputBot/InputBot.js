import React from 'react';
import './InputBot.css';


const InputBot=({onInsert})=>{
    // Enter 키 입력 이벤트를 위해서 추가한 메서드
    const handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            onInsert();
        }
    };
    
   //onInsert: 추가 버튼을 눌렀을 때 실행하는 이벤트 
   return(
       <div className="input-bot">
            <div className="add-button" onClick={onInsert}> + 새로운 챗봇 생성</div>
       </div>
   )
};

export default InputBot;