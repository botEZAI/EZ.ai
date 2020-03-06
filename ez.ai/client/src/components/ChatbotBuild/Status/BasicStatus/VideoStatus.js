import React from "react";

const VideoStatus = ({

}) => {
    return (
        <>
            <div className="status-video upload">
                <div className="status-input status-upload">
                    <div className="upload-preview">
                        <div
                            className="preview-screen upload-preview-screen cursor"
                            /*onClick={onClickUploadImage}*/
                        >
                            <p>로컬에서 동영상 불러오기</p>
                        </div>

                        {/* 이미지 양식이므로 동영상 양식으로 바꿔야합니다
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />*/}
                    </div>
                    <div className="caution">
                        <p>파일 형식: MP4, M4V, MOV, AVI, WMV</p>
                        <p>최대 파일 크기 : 200MB</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoStatus;