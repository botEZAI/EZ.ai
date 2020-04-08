import React from "react";
import BotItem from "../BotItem";
import { useDispatch, useSelector } from "react-redux";

const BotList = ({ bots, onRemove }) => {
  const { chatbotList } = useSelector((state) => state.chatbot);

  const botList = chatbotList.map((bot) => {
    return (
      <BotItem
        key={bot.id}
        onRemove={() => onRemove(bot.id)}
        botDesc={bot.desc}
        botConnect={bot.sns}
      >
        {bot.botname}
      </BotItem>
    );
  });

  return <div>{botList}</div>;
};

export default BotList;
