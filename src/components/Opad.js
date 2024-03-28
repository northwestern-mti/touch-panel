import React from 'react';

import './Opad.css'; // Import custom CSS for styling

const OPad = ({centerButton, upJoin, downJoin, leftJoin, rightJoin, centerJoin}) => {
  const sendSignal = (joinNumber, action) => {
    window.CrComLib.publishEvent('b', `${joinNumber}`, true);
    window.CrComLib.publishEvent('b', `${joinNumber}`, false);
    console.log(`Sending signal for ${action} direction`);
  };

  return (
    <nav class="o-pad mx-auto">
      <div class="up" onClick={() => sendSignal(upJoin, "Up")}>
        <i class="d-inline-block bi bi-caret-up-fill font-size-4 font-size-5-xl mx-auto"></i>
      </div>
      <div class="right" onClick={() => sendSignal(rightJoin, "Right")}>
        <i class="d-inline-block bi bi-caret-right-fill font-size-4 font-size-5-xl mx-auto"></i>
      </div>
      <div class="down" onClick={() => sendSignal(downJoin, "Down")}>
        <i class="d-inline-block bi bi-caret-down-fill font-size-4 font-size-5-xl mx-auto"></i>
      </div>
      <div class="left" onClick={() => sendSignal(leftJoin, "Left")}>
        <i class="d-inline-block bi bi-caret-left-fill font-size-4 font-size-5-xl mx-auto"></i>
      </div>
      {centerButton &&
        <div class="position-absolute center-button" onClick={() => sendSignal(centerJoin, "Center")}></div>}
    </nav>
  );
};

export default OPad;
