import React, {useState} from "react";
import produce from "immer";
import "./ButtonTemplateStatus.css";



const ButtonTemplateStatus = (
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
    listCount,
    curListCount,
    setCurListCount,
) => {

    const btnTemplateNode =
        {
            type : "buttons" ,
            thumbnailImageUrl : "" ,
            imageSize : "cover",
            imageBackgroundColor : "#FFFFFF",
            title : "",
            text : "",
            defaultAction: {  // 사진, 이미지, 제목등 탭했을때
                "type": "uri",
                "label": "View detail",
                "uri": ""
            },
            actions: [  // 최대 4개
                {
                    id : 0,
                    type: "uri",
                    label: "View detail",
                    uri: "http://example.com/page/123"
                },
                {
                    id : 1,
                    type: "postback",
                    label: "Buy",
                    data: "action=buy&itemid=123"
                },
                {
                    id : 2,
                    type: "postback",
                    label: "Add to cart",
                    data: "action=add&itemid=123"
                },
                {
                    id : 3,
                    type: "uri",
                    label: "View detail",
                    uri: "http://example.com/page/123"
                }
            ]
        };

    /* action 영역 개수 변경 */
    const [actionBtns, setActionBtns] = useState(0);
    const [showActionAddBtn, setShowActionAddBtn] = useState(true);

    const changeActionBtnCount = i => {
        if (i < 4) {
            setActionBtns(i);
            setShowActionAddBtn(true);
        } else {
            setShowActionAddBtn(false);
        }
    }
    /* action type 변경 */
    const changeActionType = e => {
        console.log(e, e.target.innerHTML, e.target.name)
    }

    return (
        <div className="btn-template-status">
            <div className="btn-template-size">
                <input className="btn-template-color" placeholder="이미지 배경색 코드 입력"/>
                <div className="btn-template-image-size">cover</div>
            </div>
            <div className="btn-template-status-main">
                <div className="btn-template-thumbnail" title="썸네일 이미지 업로드(선택)">
                    <i className="fas fa-upload"></i>
                    <div className="btn-template-thumbnail-cautions">
                        <div className="btn-template-thumbnail-caution">
                            파일 형식 : JPEG, PNG
                        </div>
                        <div className="btn-template-thumbnail-caution">
                            파일 최대 너비 : 1024px / 최대 파일 크기: 1MB
                        </div>
                    </div>
                </div>
                <div className="btn-template-contents">
                    <div className="btn-template-title">
                        <input type="text" placeholder="타이틀을 적어주세요(선택)" />
                    </div>
                    <div className="btn-template-text">
                        <textarea placeholder="텍스트를 적어주세요(필수 항목)" /></div>
                    <div className="btn-template-actions">
                        {btnTemplateNode.actions.map(act => (
                            <>
                                {act.id <= actionBtns ? (
                                    <div className="btn-template-action">

                                        <div className="btn-action-types">
                                            <div className="btn-action-type" name="0" onClick={changeActionType}>
                                                url
                                            </div>
                                            <div className="btn-action-type" name="0" onClick={changeActionType}>키워드</div>
                                        </div>
                                        <div className="btn-action-label">
                                            {act.type === "uri" ? (
                                                    <input type = "text" placeholder="연동할 url를 입력해주세요" />
                                                )
                                                :
                                                (
                                                    <select>
                                                        <option value="none" selected disabled>연동할 키워드를 선택해주세요</option>

                                                    </select>
                                                )
                                            }


                                            <input type="text" placeholder="버튼이름을 작성해주세요" />
                                        </div>
                                        <div className="btn-action-remove">
                                            <i className="fas fa-minus-circle"></i>
                                        </div>
                                    </div>
                                ) : null}

                            </>
                        ))
                        }

                        <div className="btn-action-add">
                            <div className="add-btn">
                                action 추가
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ButtonTemplateStatus