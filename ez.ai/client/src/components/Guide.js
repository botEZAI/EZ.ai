import React from 'react';
import ReactDom from "react-dom";
import ReactMarkdown from 'react-markdown';

const source = `
## MarkdownPreview

> todo: React component preview markdown text.
`;

const Guide = () => {
    return (
        <ReactMarkdown source = {source}/>
    )
};

export default Guide;

