import React, {useContext, useState } from "react";
import { NavTabSelectContext } from "./context/NavTabSelectContext";

function NavBar({list, name}) {
  const [activeTab, setActiveTab] = useState(0);
  const {setTabId}=useContext(NavTabSelectContext);
  
  const handleTabClick = async function (index, link) {
    setActiveTab(index);
    setTabId(index);
    // try {
    //     const response = await fetch(link);
    //     const data = await response.json();
    //     console.log("API Response:", data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
  };
  return (
    <div className="col-sm-12">
      <ul className="nav nav-tabs">
        <li className="nav-link disabled">{name}</li>
        {list.map((item, index) => (
          <li className="nav-item" key={item.name}>
            <button className={activeTab === index ? "nav-link active" : "nav-link"} onClick={()=>handleTabClick(index, item.link)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <br/>
    </div>
  );
}

export default NavBar;
