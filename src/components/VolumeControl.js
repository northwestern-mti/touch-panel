import { useEffect, useState, useRef } from "react";
import CrComLib from "@crestron/ch5-crcomlib";
import {Button} from 'react-bootstrap';
import './VolumeControl.css'

const VolumeControl = ({initialVolume, plusJoin, minusJoin, isMuted, volumeJoin}) => {
  const [volume, setVolume] = useState(0);
  const [pressInterval, setPressInterval] = useState(null);
  const holdTimeoutRef = useRef(null);

  const CrSignalType = {
    'Boolean' : 'b',
  }

  useEffect(() => {
    // Map decibels to the volume range (0 to 20)
    // const mappedVolume = Math.round((initialVolume * 20) / 65535);

    setVolume(initialVolume);
    console.log('initial volume:', initialVolume);
  }, []);

  const handleIncreaseVolume = () => {
    if (volume < 20) {
      setVolume((prevVolume) => prevVolume + 1);
      // const volumeLevel = Math.round((volume * 65535) / 20);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${plusJoin}`, true);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${plusJoin}`, false);
      // window.CrComLib.publishEvent('n', `${volumeJoin}`, volume);
      console.log('volume increased', volume, 'initial volume:', initialVolume);

    }
  };

  const handleDecreaseVolume = () => {
    if (volume > 0) {
      setVolume((prevVolume) => prevVolume - 1);
      // const volumeLevel = Math.round((volume * 65535) / 20);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${minusJoin}`, true);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${minusJoin}`, false);
      // window.CrComLib.publishEvent('n', `${volumeJoin}`, volume);
      console.log('volume decreased', volume, 'initial volume:', initialVolume)
    }
  };
  const handleDecreaseOnClick = () => {
    handleDecreaseVolume();
    window.CrComLib.publishEvent(CrSignalType.Boolean, `${minusJoin}`, false);
  }
  const handleDecreaseOnMouseDown = () => {
    clearInterval(pressInterval);
    setPressInterval(setInterval(handleDecreaseVolume, 200));
  } 
  const handleDecreaseOnMouseUp = () => {
    if (pressInterval !== null) {
      clearInterval(pressInterval);
      setPressInterval(null);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${minusJoin}`, false);
    }
  }
  const handleIncreaseOnClick = () => {
    handleIncreaseVolume();
    window.CrComLib.publishEvent(CrSignalType.Boolean, `${plusJoin}`, false);
  }
  const handleIncreaseOnMouseDown = () => {
    clearInterval(pressInterval)
    setPressInterval(setInterval(handleIncreaseVolume, 200));
  } 
  const handleIncreaseOnMouseUp = () => {
    if (pressInterval !== null) {
      clearInterval(pressInterval);
      setPressInterval(null);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${plusJoin}`, false);
    }
    
  }
const handleIncreaseOnTouchMove = (e) => {
  const incBtn = document.getElementById('increaseButton');
  const touch = e.touches[0];
  const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
  if (!incBtn.contains(targetEl)) {
    handleIncreaseOnMouseUp();
  }
}
const handleDecreaseOnTouchMove = (e) => {
  const decBtn = document.getElementById('decreaseButton');
  const touch = e.touches[0];
  const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
  if (!decBtn.contains(targetEl)) {
    handleDecreaseOnMouseUp();
  }
}
  
  useEffect(() => {
    // Map decibels to the volume range (0 to 20)
    if (!isMuted){
        // const mappedVolume = Math.round((initialVolume * 20) / 65535);
        setVolume(initialVolume);
    }
    
  }, []);


  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < 20; i++) {
      squares.push(
        <div
          key={i}
          className={`square ${isMuted ? 'gray' : (i < volume ? 'filled' : '')}`}
        ></div>
      );
    }
    return squares;
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
        <button className="bg-info border-0 rounded-circle me-2 volumeButton" id="decreaseButton"
          onClick={handleDecreaseOnClick}
          onMouseDown={handleDecreaseOnMouseDown}
          onMouseUp={handleDecreaseOnMouseUp}
          onMouseLeave={handleDecreaseOnMouseUp}
          onTouchStart={handleDecreaseOnMouseDown}
          onTouchEnd={handleDecreaseOnMouseUp}
          onTouchCancel={handleDecreaseOnMouseUp}
          onTouchMove={handleDecreaseOnTouchMove}>
            <i className="bi bi-dash-lg text-white fw-bold font-size-5 font-size-6-xl"></i>
        </button>
        <div className="squaresContainer me-2">{renderSquares()}</div>
        <button className="bg-info border-0 rounded-circle volumeButton" id="increaseButton"
          onClick={handleIncreaseOnClick}
          onMouseDown={handleIncreaseOnMouseDown}
          onMouseUp={handleIncreaseOnMouseUp}
          onMouseLeave={handleIncreaseOnMouseUp}
          onTouchStart={handleIncreaseOnMouseDown}
          onTouchEnd={handleIncreaseOnMouseUp}
          onTouchCancel={handleIncreaseOnMouseUp}
          onTouchMove={handleIncreaseOnTouchMove}>
            <i className="bi bi-plus-lg text-white fw-bold font-size-5 font-size-6-xl"></i>
        </button>
    </div>
  );
};

export default VolumeControl;

