import React from "react";


const AudioStatus = ({

}) => {
    return (
        <>
            <div className="status-audio upload">
                <div className="status-input status-upload">
                    <div className="upload-preview">
                        <div
                            className="preview-screen upload-preview-screen cursor"
                            /*onClick={onClickUploadImage}*/
                        >
                            <p>로컬에서 오디오 불러오기</p>
                        </div>

                        {/* 이미지 양식이므로 오디오 양식으로 바꿔야합니다
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />*/}
                    </div>
                    <div className="caution">
                        <p>파일 형식: WAV, MP3, M4A, AAC, OGG</p>
                        <p>최대 파일 크기 : 150MB</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AudioStatus;