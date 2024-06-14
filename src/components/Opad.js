import React from 'react';

import './Opad.css'; // Import custom CSS for styling

const OPad = ({centerButton, upJoin, downJoin, leftJoin, rightJoin, centerJoin}) => {
  const CrSignalType = {
    'Boolean' : 'b',
  }
  const sendSignal = (joinNumber, action) => {
    window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
    console.log(`Sending signal for ${action} direction`);
  };

  return (
    <div className="o-pad mx-auto">
      <div className="up" onClick={() => sendSignal(upJoin, "Up")}>
        <i className="d-inline-block bi bi-caret-up-fill font-size-4 font-size-5-xl "></i>
        <span className="visually-hidden">up</span>
      </div>
      <div className="right" onClick={() => sendSignal(rightJoin, "Right")}>
        <i className="d-inline-block bi bi-caret-right-fill font-size-4 font-size-5-xl "></i>
        <span className="visually-hidden">right</span>
      </div>
      <div className="left" onClick={() => sendSignal(leftJoin, "Left")}>
        <i className="d-inline-block bi bi-caret-left-fill font-size-4 font-size-5-xl "></i>
        <span className="visually-hidden">left</span>
      </div>
      <div className="down" onClick={() => sendSignal(downJoin, "Down")}>
        <i className="d-inline-block bi bi-caret-down-fill font-size-4 font-size-5-xl "></i>
        <span className="visually-hidden">down</span>
      </div>
      
      {centerButton &&
        <div className="position-absolute center-button border-0" onClick={() => sendSignal(centerJoin, "Center")}>
          <i className="d-inline-block bi bi-circle-fill font-size-4 font-size-5-xl mx-auto"></i>
          <span className="visually-hidden">select/enter</span>
        </div>}
    </div>
  );
};

export default OPad;
