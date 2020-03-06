import React, { useState, useEffect} from "react";


const Preview = (tabActive) => {
        /* 오른쪽 사이드바 fold 동적 프로그래밍 코드*/
    const [active, setActiveTab] = useState({tab1:true, tab2:false, tab3:false})
    const [prevTabPosition, setPrevTabPosition] = useState("-40px");
    const [previewDisplay, setPreviewDisplay] = useState({tab1:"none", tab2:"none", tab3:"none"});
    const prevTabStyle = {
        marginLeft: prevTabPosition,
        transition: ".5s "
    }
    const toggle = e =>{
        if(e.target.id === "tab-1")
            { setActiveTab({tab1:true, tab2:false, tab3:false})
              setPreviewDisplay({tab1:"inherit",tab2:"none",tab3:"none"}) }
        else if(e.target.id === "tab-2")
            { setActiveTab({tab1:false, tab2:true, tab3:false})
              setPreviewDisplay({tab1:"none",tab2:"inherit",tab3:"none"}) }
        else if(e.target.id === "tab-3")
            { setActiveTab({tab1:false, tab2:false, tab3:true})
              setPreviewDisplay({tab1:"none",tab2:"none",tab3:"inherit"}) }
        else
            { setActiveTab({tab1:false, tab2:false, tab3:false})
              setPreviewDisplay({tab1:"none",tab2:"none",tab3:"none"}) }
    }
    useEffect(() => {
        if (tabActive === true) {
            console.log("tabActive:"+tabActive)
        } else if (tabActive === false) {
            console.log("tabActive:"+tabActive)
            // setPrevTabPosition("-40px");
            // setPreviewDisplay({tab1:"none", tab2:"none", tab3:"none"})
        }
    },[]);
    return (
        <>
            <div className="preview">
                <ul className="preview-tab" style={prevTabStyle}>
                    <li id="tab-1" className={active.tab1? "active" : ""} 
                        onClick={e => toggle(e)}
                        >tab1</li>
                    <li id="tab-2" className={active.tab2? "active" : ""} 
                        onClick={e => toggle(e)} 
                        >tab2</li>
                    <li id="tab-3" className={active.tab3? "active" : ""} 
                        onClick={e => toggle(e)} 
                        >tab3</li>
                </ul>
                <div className={active.tab1? "active-content" : "sidebar-icon"}
                     style={{display:previewDisplay.tab1}}>
                    -------------------------@----------------------------
                </div>
                <div className={active.tab2? "active-content" : "sidebar-icon"}
                     style={{display:previewDisplay.tab2}}>
                    -----------------★----------------★------------------
                </div>
                <div className={active.tab3? "active-content" : "sidebar-icon"}
                     style={{display:previewDisplay.tab3}}>
                    -----------♥-----------♥---------♥------------------
                </div>
            </div>
        </>
        )
}



export default Preview;