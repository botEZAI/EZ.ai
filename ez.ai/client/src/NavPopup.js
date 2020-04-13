import React from "react"
import {Link} from "react-router-dom";

const NavPopup = (
    onLogout
) => {
    return (
        <div className="NavPopUp">
            <div className="NavPopUp-btns">
                <div className = "NavPopUp-btn myInfo" ><Link to="/profile">내정보</Link></div>
                <div className= "NavPopUp-btn logout" onClick={onLogout}>로그아웃</div>
            </div>

        </div>
    )
};

export default NavPopup