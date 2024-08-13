import { Outlet } from "react-router";
import TopBar from "../../components/shared/Topbar";
import LeftSideBar from "../../components/shared/leftSideBar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Container = () => {
  const [sideButton, setSideButton] = useState<boolean>(true);


  
  return (
    <>
    <ToastContainer />
      <TopBar sideButton={sideButton} setSideButton={setSideButton}/>
      <div className="flex">
        
    
        <LeftSideBar sideButton={sideButton} setSideButton={setSideButton}/>
        <main className={`${sideButton?" pl-60  ":" "}w-full p-4 pt-36   overflow-scroll`}>
          <Outlet />
        </main>
      </div>

    </>
  );
};

export default Container;
