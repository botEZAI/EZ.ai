import React from "react";
import BotItem from "../BotItem";
import { useDispatch, useSelector } from "react-redux";

const BotList = ({ bots, onRemove, platformInfo }) => {
  const { chatbotList } = useSelector((state) => state.chatbot);

  const botList = chatbotList.map((bot) => {
    return (
      <BotItem
        key={bot.id}
        id={bot.id}
        onRemove={() => onRemove(bot.id)}
        botDesc={bot.desc}
        botConnect={bot.sns}
        plaformInfo = {platformInfo}
      >
        {bot.botname}
      </BotItem>
    );
  });

  return <div className="bot-item">{botList}</div>;
};

export default BotList;
