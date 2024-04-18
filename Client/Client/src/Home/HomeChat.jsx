import Sidebar from "../components/FirebaseComponents/Sidebar";
import ChatContainer from "../components/FirebaseComponents/ChatContainer";
import React , {useState } from "react";

function HomeChat() {
    const [toggleChat, setToggleChat] = useState(false)
  
    return (
      <>
        {/* <div>{ <Header /> }</div> */}
        <div className="home-container">
          {/* {!toggleChat && ( */}
          <Sidebar toggleChat={toggleChat} setToggleChat={setToggleChat} />
          {/* )} */}
          {/* {toggleChat && ( */}
  
          <ChatContainer toggleChat={toggleChat} setToggleChat={setToggleChat} />
          {/* )} */}
        </div>
      </>
    )
  }
  
  export default HomeChat