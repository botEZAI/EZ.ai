import React from "react"
import "./BuilderInfo.css"


const BuilderInfo = () => {
    return (
        <>
            <div className="info__column">
                <div className="info-name">
                    <p>챗봇 이름</p>
                </div>
                <div className = "info-discription">
                    <p>챗봇 간단 설명</p>
                </div>
            </div>
            <div className="info__column">
                <div className="info-platform">
                    <p>플랫폼 정보</p>
                </div>
            </div>
        </>
    )
}

export default BuilderInfo;