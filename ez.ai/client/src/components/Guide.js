import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

import "./Guide.css"

const source = `
## MarkdownPreview

> todo: React component preview markdown text.
`;

const Guide = () => {
    // 가이드라인 목록 컨텐츠
    const guideLine = [
        {
            type : "guideline-list",
            name : "Step 0. 이지 AI 소개 및 비전",
        },
        {
            type : "guideline-list",
            name : "Step 1. 챗봇 생성",
        },
        {
            type : "guideline-list",
            name : "Step 2. 플랫폼 연동",
        },
        {
            type : "guideline-list-inner",
            name : "페이스북 메신저 챗봇 연동",
        },
        {
            type : "guideline-list-inner",
            name : "라인 챗봇 연동",
        },
        {
            type : "guideline-list-inner",
            name : "텔레그램 챗봇 연동",
        },
        {
            type : "guideline-list",
            name : "Step 3. 챗봇 설계",
        },
        {
            type : "guideline-list-inner",
            name : "전체적인 인터페이스",
        },
        {
            type : "guideline-list-inner",
            name : "Welcome 키워드",
        },
        {
            type : "guideline-list-inner",
            name : "기본 요소",
        },
        {
            type : "guideline-list-inner",
            name : "고급 요소",
        },
        {
            type : "guideline-list-inner",
            name : "키워드",
        },
        {
            type : "guideline-list",
            name : "Step 4. 사이드바",
        },
        {
            type : "guideline-list-inner",
            name : "미리보기",
        },
        {
            type : "guideline-list-inner",
            name : "버전관리",
        },
        {
            type : "guideline-list-inner",
            name : "설정",
        },
        {
            type : "guideline-list",
            name : "Step 5. 저장과 배포",
        },
        {
            type : "guideline-list",
            name : "Step 6. 마무리",
        },


    ]

    const [selectedG, setSelectedG] = useState(-1);

    return (
        <>
            <div className="guideline-contents">
                <div className="guideline-content guideline-lists">
                    {guideLine.map((guide,i) => (
                            <div className={selectedG === i ? (`${guide.type} selected-guide`) : `${guide.type}`} onClick={()=>setSelectedG(i)}>{guide.name}</div>
                    ))
                    }
                </div>
                <div className="guideline-content guideline-view">
                    <div>{selectedG}</div>
                    <ReactMarkdown source = {source} />;
                </div>

            </div>
        </>
    )
};


export default Guide;

