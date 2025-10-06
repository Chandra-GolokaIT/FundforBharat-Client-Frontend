import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';
import { MdCancel } from "react-icons/md";

function SideBarFilterContainer({ isFilterContainerOpen, setIsFilterContainerOpen }) {
    const categories = ["All Categories", "Education", "Medical", "Women & Girls", "Animals", "Creative", "Food & Hunger", "Environment", "Children", "Others"];
    const sidebarcontainerRef=useRef(null);

    function handleSidebar(){
        // sidebarcontainerRef.current.classList.remove('');
        sidebarcontainerRef.current.classList.add("sidebar-animationclose")
        setTimeout(() => {
            setIsFilterContainerOpen(false);
        }, 500);
    }
    
    useEffect(() => {
        // Disable scrolling when sidebar is open
    sidebarcontainerRef.current.classList.add("sidebaranimation-open")

        if (isFilterContainerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Clean up
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isFilterContainerOpen]);


    return createPortal(
        <div className='sidebar-modal'>
            <div className='sidebarfiltercontainer' ref={sidebarcontainerRef}>
                <div className="sidebarfiltercontainer-header">
                    <span style={{ fontSize: '17px' }}>Filters</span>
                    <MdCancel size={25} style={{ width: '50px', cursor: 'pointer' }} onClick={handleSidebar} />
                </div>
                <div className="sidebarfiltercontainerbody">
                    <div className="sidebarfiltercontainerbody-leftpartcontainer">
                        <div className="sidebarfiltercontainerbody-filterskey">
                            <span>CATEGORY</span>
                            <span>TYPE</span>
                            <span>LOCATION</span>
                        </div>
                        <span className='sidebarfiltercontainerbody-resetbtn'>Reset</span>
                    </div>
                    <div className="sidebarfiltercontainerbody-rightpartcontainer" style={{ paddingRight: '50px' }}>
                        {
                            categories.map((category, index) => (
                                <div key={index}>
                                    <input type="radio" id={category} name="filtercategory" value={category} />
                                    <label htmlFor={category}>{category}</label>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('modal')
    )
}

export default SideBarFilterContainer