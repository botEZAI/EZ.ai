import React from 'react';
import queryString from "query-string";

const Object = ({location}) => {
    console.log(location);
    const query = queryString.parse(location.search);
    console.log(query);//id 경로를 받음
    return (
        <div>
           <img src={ require('../objects/main-logo-1.png')} /> 
           {/* 이미지 테스트 중  */}
        </div>
    );
};

export default Object;