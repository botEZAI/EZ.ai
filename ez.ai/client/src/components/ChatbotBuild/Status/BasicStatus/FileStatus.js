import React from "react";

const FileStatus = ({

}) => {
    return (
        <>
            <div className="status-file upload">
                <div className="status-input status-upload">
                    <div className="upload-preview">
                        <div
                            className="preview-screen upload-preview-screen cursor"
                            /*onClick={onClickUploadImage}*/
                        >
                            <p>로컬에서 파일 불러오기</p>
                        </div>

                        {/* 이미지 양식이므로 파일 양식으로 바꿔야합니다
                    <input
                        ref={imageRef}
                        type="file"
                        hidden
                        onChange={onChangeImage}
                    />*/}
                    </div>
                    <div className="caution">
                        <p>파일 형식: HWP, EXCEL ,PPT, WORD, ZIP 등</p>
                        <p>최대 파일 크기 : 50MB</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileStatus;