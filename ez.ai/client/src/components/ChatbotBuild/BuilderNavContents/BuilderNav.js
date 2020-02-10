import React, { useState } from "react";


const BuilderNav = () => {
    const [navWidth, setNavWidth] = useState('400px');
    const [leftArrowDisplay, setLeftArrowDisplay] = useState('none');
    const [rightArrowDisplay, setRightArrowDisplay] = useState('block');


    const navStyle = {
        width : navWidth,
        transition: '.5s width'

    }
    const rightArrow = {
        display : rightArrowDisplay
    }
    const leftArrow = {
        display : leftArrowDisplay
    }

    const foldNav = (e) => {
        if (navWidth === '400px'){
            setNavWidth('50px');
            setLeftArrowDisplay('block');
            setRightArrowDisplay('none');

        } else {
            setNavWidth('400px');
            setLeftArrowDisplay('none');
            setRightArrowDisplay('block');
        }

    }

    return (
            <>
                <div className="builder__column builderNav" style={navStyle}>
                    <div className="builderNav-btn" onClick = {foldNav}>
                        <i className="fas fa-angle-double-right" style={rightArrow}></i>
                        <i className="fas fa-angle-double-left" style={leftArrow}></i>
                    </div>
                    <div className="preview">

                    </div>
                </div>
            </>
        )
}



export default BuilderNav;