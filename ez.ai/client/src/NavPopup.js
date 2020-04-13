import React from "react"

const NavPopup = (
    onLogout
) => {
    return (
        <div className="NavPopUp">
            <button className="logout" onClick={onLogout}>
                로그아웃
            </button>
        </div>
    )
};

export default NavPopup