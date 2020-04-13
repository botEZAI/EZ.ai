import React, { useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "./reducer/user";

const NavPopup = ({ showNP, setShowNP, history }) => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    setShowNP(() => !showNP);
    alert("로그아웃되었습니다. 메인페이지로 이동합니다.");
    history.push("/");
  }, []);
  return (
    <div className="NavPopUp">
      <div className="NavPopUp-btns">
        <div className="NavPopUp-btn myInfo">
          <Link to="/profile">내정보</Link>
        </div>
        <div className="NavPopUp-btn logout" onClick={onLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavPopup);
