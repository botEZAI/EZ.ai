import React from 'react';
import BotItem from '../BotItem';

const BotList = ({bots, onRemove, }) => {
    
    const botList = bots.map (bot => {
        return <BotItem key = {bot.id}
                        onRemove = {() => onRemove(bot.id)}
                        botDesc={bot.desc}
                        botConnect={bot.sns}>
                        {bot.name}
                </BotItem>
    });

    return(
        <div>
            {botList}
        </div>
    );
}

export default BotList;