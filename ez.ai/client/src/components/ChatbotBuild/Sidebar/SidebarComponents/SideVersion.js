import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {LOAD_HISTORY_REQUEST, RECOVER_HISTORY_REQUEST, REMOVE_HISTORY_REQUEST} from "../../../../reducer/chatbot";
import "./SideVersion.css";

const SideVersion = ({activeSideTab, setKeywordObject, setKeywordCategory}) => {
    const dispatch = useDispatch();
    const {
        currentChatbot,
        history,
        currentCategories,
        isUpdateSuccess,
    } = useSelector((state) => state.chatbot);

    useEffect(() => {
        currentChatbot &&
        dispatch({
            type: LOAD_HISTORY_REQUEST,
            data: currentChatbot,
        });
    }, [activeSideTab === "history", isUpdateSuccess]);
    useEffect(() => {
        const chatbotData = currentChatbot && JSON.parse(currentChatbot.data);
        chatbotData && setKeywordObject(chatbotData);
        const categoriesData = currentCategories && currentCategories;
        categoriesData && setKeywordCategory(categoriesData);
    }, [currentChatbot]);

    //기록 복구
    const onRecoverHistory = useCallback(
        (history) => {
            dispatch({
                type: RECOVER_HISTORY_REQUEST,
                data: { currentChatbot, history },
            });
        },
        [history, currentChatbot]
    );
    //기록 삭제
    const onDeleteHistory = useCallback(
        (history) => {
            if (history.info === "초기") alert("초기 버전은 삭제할 수 없습니다.");
            else {
                dispatch({
                    type: REMOVE_HISTORY_REQUEST,
                    data: { currentChatbot, history },
                });
            }
        },
        [history]
    );

    return (
        <div className="sidebar-article">
            {history &&
            JSON.parse(history)
                .reverse()
                .map((v) => (
                    <div className="sidebar-history-box">
                        <div>
                            {" "}
                            {v.info}
                            <button
                                className="sidebar-history-button"
                                onClick={() => onDeleteHistory(v)}
                            >
                                삭제
                            </button>
                            <button
                                className="sidebar-history-button"
                                onClick={() => onRecoverHistory(v)}
                            >
                                불러오기
                            </button>
                        </div>
                        <div>
                            {v.createdAt.replace(/T/, " ").replace(/\..+/, "")}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default SideVersion;