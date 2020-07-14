import React, {useState} from "react";
import "./CarouselTemplateStatus.css";
import ButtonTemplateStatus from "./ButtonTemplateStatus";

const CarouselTemplateStatus = (
    currentContent,
    setKeywordObject,
    keywordObject,
    now,
    index,
    listCount,
    curListCount,
    setCurListCount,
) => {

    // =================== 노드 데이터 ========================
     const [templateNode, setTemplateNode] = useState([
         {
             id : 0,   // 데이터에선 필요없지만 값 병경위해 필요..
             thumbnailImageUrl: "",
             imageSize: "cover",
             imageBackgroundColor: "#FFFFFF",
             title: "",
             text: "",
             defaultAction: {
                 type: "uri",
                 label: "View detail",
                 uri: "",
             },
             actions: [
                 // 최대 4개
                 {
                     id: 0,
                     type: "uri",
                     label: "View detail",
                     uri: "http://example.com/page/123",
                     data: "",
                 },
             ],
         },
       ]);

     const [carosuelNode, setCarosuelNode] = useState({
         type : "template",
         altText : "this is a carousel template",
         template : {
             type : "carousel",
             columns : templateNode
         }
     })


    // action 추가
    const addAction = node => {
        let modifiedNode = templateNode.map(tnode => tnode.id === node.id ?
            ({...tnode, actions : [...tnode.actions, {
                    id: node.actions.length,
                    type: "uri",
                    label: "",
                    uri: "", // uri 타입 사용시.
                    data: "", // postback 타입 사용시
                }]}) : tnode
        )

        setTemplateNode(modifiedNode)
        console.log(templateNode)
    }

    // action 제거
    const removeAction = (node, action_id) => {
         if(node.actions.length === 1) {
             alert("action은 최소 한개 이상 존재해야 합니다")
             return
         }

         let tmpAction = node.actions;
         tmpAction = tmpAction.filter(action => action.id !== action_id);
         tmpAction = tmpAction.map((action, index) => {
             return {...action, id: index};
         });

         let modifiedNode = templateNode.map(tnode => tnode.id === node.id ?
             ({...tnode, actions : tmpAction}) : tnode
         );

         setTemplateNode(modifiedNode);
    };


    // carosuel 템플릿 추가
    const addTemplateNode = () => {
        setTemplateNode([
            ...templateNode,
                {
                    id : templateNode.length,
                    thumbnailImageUrl: "",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
                    title: "",
                    text: "",
                    defaultAction: {
                        type: "uri",
                        label: "",
                        uri: "",
                    },
                    actions: [
                        // 최대 4개
                        {
                            id: 0,
                            type: "uri",
                            label: "",
                            uri: "",
                            data: "",
                        },
                    ]
                }
            ]
        )
        console.log(templateNode)
    }




    return (
        <div className="carosuel-templates">
            {templateNode.map(node => (
                <div className="carosuel-template btn-template-status">
                    <div className="btn-template-control">
                        <div className="btn-template-color" title="이미지 배경색">
                            <input
                                type="color"
                                className="btn-template-color"
                                name="imageBackgroundColor"
                                value={node.imageBackgroundColor}
                                //onChange={onChangeTemplate}
                            />
                        </div>
                        <div className="btn-template-image-sizes">
                        {node.imageSize !== "cover" ? (
                            <div
                                className="btn-template-image-size"
                                title="이미지 형태 : cover"
                                //onClick={() => changeImageType("cover")}
                            >
                                <i className="fas fa-expand"></i>
                            </div>
                            ) : (
                            <div
                                className="btn-template-image-size"
                                title="이미지 형태 : contain"
                                //onClick={() => changeImageType("contain")}
                            >
                                <i className="fas fa-compress"></i>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="btn-template-status-main">
                        <div
                            className="btn-template-thumbnail"
                            title="썸네일 이미지 업로드(선택)"
                        style={{
                            backgroundColor: node.imageBackgroundColor,
                        }}
                        // onClick={onClickUploadImage}
                        >
                            <img
                                className="btn-template-thumbnail-image"
                                src={node.thumbnailImageUrl}
                            />
                            <input
                                //ref={imageRef}
                                type="file" hidden
                                //onChange={onChangeImage}
                            />
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
                            <input
                                type="text"
                                placeholder="타이틀을 적어주세요(선택)"
                                name="title"
                                value={node.title}
                                //onChange={onChangeTemplate}
                            />
                        </div>
                        <div className="btn-template-text">
                            <textarea
                                placeholder="텍스트를 적어주세요(필수 항목)"
                                name="text"
                                value={node.text}
                                //onChange={onChangeTemplate}
                            />
                        </div>
                        <div className="btn-template-actions">
                    {node.actions.map(act => (
                        <>
                            <div className="btn-template-action">
                                <div className="btn-action-types">
                            <div
                                className="btn-action-type"
                                //onClick={() => changeActionType(act.id, "uri")}
                            >
                                url
                            </div>
                            <div
                                className="btn-action-type"
                                //onClick={() => changeActionType(act.id, "postback")}
                            >
                                키워드
                            </div>
                        </div>
                                <div className="btn-action-label">
                        {act.type === "uri" ? (
                            <input
                                type="text"
                                placeholder="연동할 url를 입력해주세요"
                                name="uri"
                                //onChange={(e) => onChangeAction(e, act.id)}
                                value={act.uri}
                            />
                            ) : (
                            <select name="data" //onChange = {e=>onChangeAction(e, act.id)}
                            >
                                <option value="none" selected disabled>
                                    연동할 키워드를 선택해주세요
                                </option>
                                {keywordObject.map((keyword, index) => {
                                    return (
                                        <>
                                            <option
                                                key={index}
                                                value={keyword.keyword}
                                            >
                                                {keyword.keyword}
                                            </option>
                                        </>
                                    )
                                })}
                                </select>
                        )}

                        <input
                            type="text"
                            placeholder="버튼이름을 작성해주세요"
                            name="label"
                            value={act.label}
                            //onChange={(e) => onChangeAction(e, act.id)}
                        />
                    </div>
                                <div
                                    className="btn-action-remove"
                                    onClick={() => removeAction(node, act.id)}
                                >
                                    <i className="fas fa-minus-circle"></i>
                                </div>
                            </div>
                        </>
                    ))}

                {node.actions.length < 4 ? (
                    <div className="btn-action-add">
                        <div className="add-btn"
                             onClick={() => addAction(node)}
                        >
                        action 추가
                    </div>
                </div>
                ) : null
                }
                    </div>
                        </div>
                    </div>
                </div>
                )
            )}
            <div className="carosuel-template-add" onClick={addTemplateNode}>슬라이드 추가하기</div>
        </div>
    )
};

export default CarouselTemplateStatus;