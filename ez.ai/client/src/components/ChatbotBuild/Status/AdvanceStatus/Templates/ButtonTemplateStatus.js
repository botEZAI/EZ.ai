import React, {useState} from "react";
import produce from "immer";
import "./ButtonTemplateStatus.css";



const ButtonTemplateStatus = (
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    setCurListCount,
) => {

    const [nodeAction, setNodeAction] = useState([  // 최대 4개
        {
            id : 0,
            type: "uri",
            label: "View detail",
            uri: "http://example.com/page/123"
        },

    ])

    const btnTemplateNode = [
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
                actions: nodeAction
            }
        ]

    /* action 영역 개수 변경 */
    const [showActionAddBtn, setShowActionAddBtn] = useState(true);

    // action  추가
    const addAction = () => {
        console.log(btnTemplateNode)
        // 요소추가
        if (nodeAction.length < 4){
            setNodeAction([
                ...nodeAction,
                {
                    id : nodeAction.length,
                    type : "uri",
                    label : "",
                    uri : "",   // uri 타입 사용시.
                    data : ""   // postback 타입 사용시
                }]
            )
        }
        nodeAction.map(node => console.log(node))

        console.log(btnTemplateNode, nodeAction )
    }

    // action 제거
    const removeAction = id => {
        // actions에서 id부분 제거
        console.log("이전", nodeAction, id)
        setNodeAction(nodeAction.filter(action => action.id !== id))
        console.log("이후", nodeAction)
        // 남은 요소들 id remap
        setNodeAction(
            nodeAction.map((action, index) =>
            action.id > id ? (
                { ...action, id : index}
             ) : action
            )
        )
        console.log(nodeAction)
    }


    const changeActionBtnCount = i => {
        if (i < 4) {
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
            <div className="btn-template-control">
                <input type="color" className="btn-template-color" value="#ffffff"/>
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
                        {nodeAction.map(act => (
                            <>
                                <div className="btn-template-action">

                                    <div className="btn-action-types">
                                        <div className="btn-action-type" name="0">
                                            url
                                        </div>
                                        <div className="btn-action-type" name="0">키워드</div>
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
                                    <div className="btn-action-remove" onClick={() => removeAction(act.id)}>
                                        <i className="fas fa-minus-circle"></i>
                                    </div>
                                </div>

                            </>
                        ))
                        }

                        <div className="btn-action-add">
                            <div className="add-btn" onClick={() => addAction()}>
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