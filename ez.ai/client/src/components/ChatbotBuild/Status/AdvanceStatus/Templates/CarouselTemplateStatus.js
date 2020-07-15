import React, {useState} from "react";
import "./CarouselTemplateStatus.css";
import ButtonTemplateStatus from "./ButtonTemplateStatus";

const CarouselTemplateStatus = ({
                                    currentContent,
                                    setKeywordObject,
                                    keywordObject,
                                    now,
                                    index,
                                    listCount,
                                    curListCount,
                                    setCurListCount,
                                }) => {

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
    }

    // template(column) 제거
    const removeTemplate = node => {
         if (templateNode.length === 1) {
             alert("템플릿은 최소 한개 이상 존재해야 합니다");
             return
         }
         let tmpTemplate = templateNode.filter(tmp => tmp.id !== node.id);


         tmpTemplate = tmpTemplate.map((tmp, index) => {
             return {...tmp, id: index}
         })
        setTemplateNode(tmpTemplate)
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
    }

    // =================== onChange 기능 함수 ========================
    //carosuel node Onchange
    const onChangeTemplate = (e, node) => {
        setTemplateNode(templateNode.map(tnode => tnode.id === node.id ?
            ({
                ...tnode,
                [e.target.name]: e.target.value
            }) : tnode
        ))
    }

    const onChangeTemplateActionType = (node, id, type) => {
        let tmpAction = node.actions.map(action =>
            action.id === id ? {...action, type : type } : action
        )
        setTemplateNode(templateNode.map(tnode => tnode.id === node.id ?
            ({
                ...tnode,
                actions : tmpAction
            }) : tnode
        ))
    }

    const onChangeTemplateImageSizeType = (node, imageSizeType) => {
        setTemplateNode(templateNode.map(tnode => tnode.id === node.id ?
            ({
                ...tnode,
                "imageSize": imageSizeType
            }) : tnode
        ))
    }

    const onChangeTemplateAction = (e, node, id) => {
        let tmpAction = node.actions.map(action => action.id === id ? (
            {...action, [e.target.name]: e.target.value }
        ) : action);
        setTemplateNode(templateNode.map(tnode => tnode.id === node.id ?
            ({
                ...tnode,
                actions : tmpAction
            }) : tnode
        ))
    };




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
                                onChange={e=>onChangeTemplate(e, node)}
                            />
                        </div>
                        <div className="btn-template-image-sizes">
                        {node.imageSize !== "cover" ? (
                            <div
                                className="btn-template-image-size"
                                title="이미지 형태 : cover"
                                name="imageSize"
                                value="cover"
                                onClick={()=>onChangeTemplateImageSizeType(node, "cover")}
                            >
                                <i className="fas fa-expand"></i>
                            </div>
                            ) : (
                            <div
                                className="btn-template-image-size"
                                title="이미지 형태 : contain"
                                name="imageSize"
                                value="contain"
                                onClick={()=>onChangeTemplateImageSizeType(node, "contain")}
                            >
                                <i className="fas fa-compress"></i>
                            </div>
                        )}
                            <div
                                className="btn-template-image-size"
                                title="column 제거"
                                onClick={() => removeTemplate(node)}
                            >
                                <i className="far fa-trash-alt"></i>
                            </div>
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
                            {keywordObject[index].contents[now].content.thumbnailImageUrl !== "" || keywordObject[index].contents[now].content.imageBackgroundColor !== "#FFFFFF" ? (
                                <img
                                    className="btn-template-thumbnail-image"
                                    src={keywordObject[index].contents[now].content.thumbnailImageUrl}
                                    style={keywordObject[index].contents[now].content.imageSize === "cover" ? {width : "100%"}: {height : "100%"}}
                                />
                            ) : (
                                <>
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
                                </>
                            )}
                    </div>
                    <div className="btn-template-contents">
                        <div className="btn-template-title">
                            <input
                                type="text"
                                placeholder="타이틀을 적어주세요(선택)"
                                name="title"
                                value={node.title}
                                onChange={e=>onChangeTemplate(e, node)}
                            />
                        </div>
                        <div className="btn-template-text">
                            <textarea
                                placeholder="텍스트를 적어주세요(필수 항목)"
                                name="text"
                                value={node.text}
                                onChange={e=>onChangeTemplate(e, node)}
                            />
                        </div>
                        <div className="btn-template-actions">
                    {node.actions.map(act => (
                        <>
                            <div className="btn-template-action">
                                <div className="btn-action-types">
                                    <div
                                        className="btn-action-type"
                                        onClick={()=>onChangeTemplateActionType(node, act.id,"uri")}
                                    >
                                        url
                                    </div>
                                    <div
                                        className="btn-action-type"
                                        onClick={()=>onChangeTemplateActionType(node, act.id,"postback")}
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
                                            onChange={(e) => onChangeTemplateAction(e, node, act.id)}
                                            value={act.uri}
                                        />
                                        ) : (
                                        <select name="data" defaultValue="none">
                                            <option value="none" disabled>
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
                                        onChange={(e) => onChangeTemplateAction(e, node, act.id)}
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
            {templateNode.length < 10 ? (
                <div className="carosuel-template-add" onClick={addTemplateNode}>슬라이드 추가하기</div>
            ) : null}

        </div>
    )
};

export default CarouselTemplateStatus;