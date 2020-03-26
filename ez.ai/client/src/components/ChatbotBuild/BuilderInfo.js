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
            <div className="info__column">
              <button>
                저장
              </button>
              <button>
                배포
              </button>
              <div className="builder_undo">
                배포 전 되돌아가기
              </div>
            </div>
        </>
    )
}

export default BuilderInfo;