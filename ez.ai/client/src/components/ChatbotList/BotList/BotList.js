import React, { useState } from "react";
import BotItem from "../BotItem";
import { useDispatch, useSelector } from "react-redux";

const BotList = ({ bots, onRemove, platformInfo, searchResults }) => {
  const { chatbotList } = useSelector((state) => state.chatbot);



  const botList = searchResults.map((bot) => {
    return (
      <BotItem
        key={bot.id}
        id={bot.id}
        onRemove={() => onRemove(bot.id)}
        botDesc={bot.desc}
        botConnect={bot.sns}
        plaformInfo={platformInfo}
      >
        {bot.botname}
      </BotItem>
    );
  });

  const emptyList = () => {
    return <div className="empty-item"></div>
  }

  return (
      <>
        <div className="bot-item">{botList}</div>
        {Array(12-botList.length).fill(' ').map(() => emptyList())}
        {console.log(botList.length, "lens")}
      </>
  )
};

export default BotList;
