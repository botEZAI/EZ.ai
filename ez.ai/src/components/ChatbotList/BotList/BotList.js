import React from 'react';
import BotItem from '../BotItem';

const BotList = (props) => {
    
    const {bots, onRemove}=props;

        // 여기다가~
    const botList = bots.map (bot => {
        return <BotItem key = {bot.id}
                        onRemove = {() => onRemove(bot.id)}>
                        {bot.text}
                </BotItem>
    });

    return(
        <div>
            {botList}
        </div>
    );
}

export default BotList;