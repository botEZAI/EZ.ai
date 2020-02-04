import React from "react";

const Main = ({ mainKeyword, keywordContentList }) => {
  return (
    <>
      <div className="main-keyword-title">KEYWORD:{mainKeyword}</div>
      {keywordContentList.map((content, index) => {
        return <div key={index}>{content.type}</div>;
      })}
    </>
  );
};

export default Main;
