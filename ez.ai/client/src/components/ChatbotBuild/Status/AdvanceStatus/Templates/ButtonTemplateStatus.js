import React, { useState, useEffect, useRef } from "react";
import produce from "immer";
import axios from "axios";

import "./ButtonTemplateStatus.css";

const ButtonTemplateStatus = ({
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  index,
  keywordPopup,
  setKeywordPopup,
  listCount,
  curListCount,
  setCurListCount,
}) => {
  // action 추가 버튼 가시성
  const [showActionAddBtn, setShowActionAddBtn] = useState(true);

  // =================== 노드 데이터 ======================== keywordObject에서 바로 작업
  // const [nodeAction, setNodeAction] = useState([
  //   // 최대 4개
  //   {
  //     id: 0,
  //     type: "uri",
  //     label: "View detail",
  //     uri: "http://example.com/page/123",
  //     data: "",
  //   },
  // ]);

  // const [btnTemplateNode, setBtnTemplateNode] = useState({
  //   type: "buttons",
  //   thumbnailImageUrl: "",
  //   imageSize: "cover",
  //   imageBackgroundColor: "#FFFFFF",
  //   title: "",
  //   text: "",
  //   defaultAction: {
  //     // 사진, 이미지, 제목등 탭했을때
  //     type: "uri",
  //     label: "View detail",
  //     uri: "",
  //   },
  //   actions: nodeAction,
  // });

  // =================== 기능 함수 ========================
  //이미지 업로드
  const imageRef = useRef();

  const onClickLoadImage = (e) => {
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content = e.target.value;
      })
    );
  };

  const onClickUploadImage = () => {
    imageRef.current.click();
  };
  const onChangeImage = (e) => {
    if (e.target.value === "") return;
    if (e.target.files[0].type.match(/image/g)) {
      const imageFormData = new FormData();
      imageFormData.append("image", e.target.files[0]);

      axios.post("/api/image", imageFormData).then((res) => {
        setKeywordObject(
          produce(keywordObject, (draft) => {
            draft[index].contents[now].content.thumbnailImageUrl =
              res.data.location;
          })
        );
      });
    } else return alert("이미지 파일이 아닙니다.");
  };

  // 이미지 타입 변경 - cover / contain
  const changeImageType = (type) => {
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content.imageSize = type;
      })
    );
  };

  // action  추가
  const addAction = () => {
    // 요소추가
    if (keywordObject[index].contents[now].content.actions.length < 4) {
      setKeywordObject(
        produce(keywordObject, (draft) => {
          draft[index].contents[now].content.actions.push({
            id: draft[index].contents[now].content.actions.length,
            type: "uri",
            label: "",
            uri: "", // uri 타입 사용시.
            data: "", // postback 타입 사용시
          });
        })
      );
    }
  };

  // action 제거
  const removeAction = (id) => {
    if (keywordObject[index].contents[now].content.actions.length === 1) {
      alert("action은 최소 한개 이상 존재해야 합니다");
      return;
    }
    let tmpAction = keywordObject[index].contents[now].content.actions;
    tmpAction = tmpAction.filter((action) => action.id !== id);
    tmpAction = tmpAction.map((action, index) => {
      return { ...action, id: index };
    });

    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content.actions = tmpAction;
      })
    );
  };

  /* action type 변경 */
  const changeActionType = (id, value) => {
    let tmpAction = keywordObject[index].contents[
      now
    ].content.actions.map((node) =>
      node.id === id ? { ...node, type: value } : node
    );
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content.actions = tmpAction;
      })
    );
    console.log(keywordObject)
  };

  // =================== onChange 기능 함수 ========================
  //btnTemplateNode Onchange
  const onChangeTemplate = (e) => {
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content[e.target.name] = e.target.value;
      })
    );
  };

  // nodeActions onchsnge
  const onChangeAction = (e, id) => {
    let tmpAction = keywordObject[index].contents[
      now
    ].content.actions.map((node) =>
      node.id === id ? { ...node, [e.target.name]: e.target.value } : node
    );
    setKeywordObject(
      produce(keywordObject, (draft) => {
        draft[index].contents[now].content.actions = tmpAction;
      })
    );
  };

  // ================= useEffect ==============================
  useEffect(() => {
    if (keywordObject[index].contents[now].content.actions.length === 4) {
      setShowActionAddBtn(false);
    } else {
      setShowActionAddBtn(true);
    }
  });

  return (
    <div className="btn-template-status">
      <div className="btn-template-control">
        <div classNAme="btn-template-color" title="이미지 배경색">
          <input
            type="color"
            className="btn-template-color"
            name="imageBackgroundColor"
            value={
              keywordObject[index].contents[now].content.imageBackgroundColor
            }
            onChange={onChangeTemplate}
          />
        </div>
        <div className="btn-template-image-sizes">
          {keywordObject[index].contents[now].content.imageSize !== "cover" ? (
            <div
              className="btn-template-image-size"
              title="이미지 형태 : cover"
              onClick={() => changeImageType("cover")}
            >
              <i class="fas fa-expand"></i>
            </div>
          ) : (
            <div
              className="btn-template-image-size"
              title="이미지 형태 : contain"
              onClick={() => changeImageType("contain")}
            >
              <i class="fas fa-compress"></i>
            </div>
          )}
        </div>
      </div>
      <div className="btn-template-status-main">
        <div
          className="btn-template-thumbnail"
          title="썸네일 이미지 업로드(선택)"
          style={{
            backgroundColor:
              keywordObject[index].contents[now].content.imageBackgroundColor,
          }}
          onClick={onClickUploadImage}
        >
          {keywordObject[index].contents[now].content.thumbnailImageUrl !== "" || keywordObject[index].contents[now].content.imageBackgroundColor !== "#FFFFFF" ? (
              <img
                  className="btn-template-thumbnail-image"
                  src={keywordObject[index].contents[now].content.thumbnailImageUrl}
              />
          ) : (
              <>
                <input ref={imageRef} type="file" hidden onChange={onChangeImage} />
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
              placeholder="타이틀을 적어주세요(선택) - 최대 40자"
              name="title"
              value={keywordObject[index].contents[now].content.title}
              onChange={onChangeTemplate}
            />
          </div>
          <div className="btn-template-text">
            <textarea
              placeholder={keywordObject[index].contents[now].content.thumbnailImageUrl !== "" || keywordObject[index].contents[now].content.imageBackgroundColor !== "#FFFFFF" ? "텍스트를 적어주세요(필수) - 최대 60자" : "텍스트를 적어주세요(필수) - 최대 160자"}
              name="text"
              value={keywordObject[index].contents[now].content.text}
              onChange={onChangeTemplate}
            />
          </div>
          <div className="btn-template-actions">
            {keywordObject[index].contents[now].content.actions.map((act) => (
              <>
                <div className="btn-template-action">
                  <div className="btn-action-types">
                    <div
                      className={act.type !== "uri" ? "btn-action-type" : "btn-action-type selected-action-type"}
                      onClick={() => changeActionType(act.id, "uri")}
                    >
                      url
                    </div>
                    <div
                        className={act.type !== "postback" ? "btn-action-type" : "btn-action-type selected-action-type"}
                      onClick={() => changeActionType(act.id, "postback")}
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
                        onChange={(e) => onChangeAction(e, act.id)}
                        value={act.uri}
                      />
                    ) : (
                      <select name="data" onChange = {e=>onChangeAction(e, act.id)}>
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
                      onChange={(e) => onChangeAction(e, act.id)}
                    />
                  </div>
                  <div
                    className="btn-action-remove"
                    onClick={() => removeAction(act.id)}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </div>
                </div>
              </>
            ))}

            {showActionAddBtn ? (
              <div className="btn-action-add">
                <div className="add-btn" onClick={() => addAction()}>
                  action 추가
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonTemplateStatus;
