import React from 'react';

import './Opad.css'; // Import custom CSS for styling

const OPad = ({centerButton, upJoin, downJoin, leftJoin, rightJoin, centerJoin}) => {
  const sendSignal = (joinNumber, action) => {
    window.CrComLib.publishEvent('b', `${joinNumber}`, true);
    window.CrComLib.publishEvent('b', `${joinNumber}`, false);
    console.log(`Sending signal for ${action} direction`);
  };

  return (
    <nav class="o-pad">
      <div class="up" onClick={() => sendSignal(upJoin, "Up")}></div>
      <div class="right" onClick={() => sendSignal(rightJoin, "Right")}></div>
      <div class="down" onClick={() => sendSignal(downJoin, "Down")}></div>
      <div class="left" onClick={() => sendSignal(leftJoin, "Left")}></div>
      {centerButton && 
        <div class="center-button" onClick={() => sendSignal(centerJoin, "Center")}></div>}
        
    </nav>
  );
};

export default OPad;
