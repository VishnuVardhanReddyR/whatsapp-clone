import React from 'react';
import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center className="grid items-center justify-center h-screen bg-black">
      <div>
          <img 
            src="/whatsapp-logo.png" 
            alt=""
            className="mb-10 h-48"
          />
            <Circle color="#3CBC2B" size={60} />
      </div>
    </center>
  )
}

export default Loading;
