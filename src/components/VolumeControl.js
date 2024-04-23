import { useEffect, useState, useRef } from "react";
import CrComLib from "@crestron/ch5-crcomlib";
import {Button} from 'react-bootstrap';
import AddIcon from './Icons/plus.svg';
import RemoveIcon from './Icons/dash.svg';
import './VolumeControl.css'

const VolumeControl = ({initialVolume, plusJoin, minusJoin, isMuted, volumeJoin}) => {
  const [volume, setVolume] = useState(0);
  const [pressInterval, setPressInterval] = useState(null);
  const holdTimeoutRef = useRef(null);


  useEffect(() => {
    // Map decibels to the volume range (0 to 20)
    // const mappedVolume = Math.round((initialVolume * 20) / 65535);

    setVolume(initialVolume);
    console.log('initial volume:', initialVolume);
  }, [initialVolume]);

  const handleIncreaseVolume = () => {
    if (volume < 20) {
      setVolume((prevVolume) => prevVolume + 1);
      // const volumeLevel = Math.round((volume * 65535) / 20);
      window.CrComLib.publishEvent('b', `${plusJoin}`, true);
      window.CrComLib.publishEvent('b', `${plusJoin}`, false);
      // window.CrComLib.publishEvent('n', `${volumeJoin}`, volume);
      console.log('volume increased', volume, 'initial volume:', initialVolume);

    }
  };

  const handleDecreaseVolume = () => {
    if (volume > 0) {
      setVolume((prevVolume) => prevVolume - 1);
      // const volumeLevel = Math.round((volume * 65535) / 20);
      window.CrComLib.publishEvent('b', `${minusJoin}`, true);
      window.CrComLib.publishEvent('b', `${minusJoin}`, false);
      // window.CrComLib.publishEvent('n', `${volumeJoin}`, volume);
      console.log('volume decreased', volume, 'initial volume:', initialVolume)
    }
  };
  const handleDecreaseOnClick = () => {
    handleDecreaseVolume();
    window.CrComLib.publishEvent('b', `${minusJoin}`, false);
  }
  const handleDecreaseOnMouseDown = () => {
    clearInterval(pressInterval);
    setPressInterval(setInterval(handleDecreaseVolume, 200));
  } 
  const handleDecreaseOnMouseUp = () => {
    if (pressInterval !== null) {
      clearInterval(pressInterval);
      setPressInterval(null);
      window.CrComLib.publishEvent('b', `${minusJoin}`, false);
    }
  }
  const handleIncreaseOnClick = () => {
    handleIncreaseVolume();
    window.CrComLib.publishEvent('b', `${plusJoin}`, false);
  }
  const handleIncreaseOnMouseDown = () => {
    clearInterval(pressInterval)
    setPressInterval(setInterval(handleIncreaseVolume, 200));
  } 
  const handleIncreaseOnMouseUp = () => {
    if (pressInterval !== null) {
      clearInterval(pressInterval);
      setPressInterval(null);
      window.CrComLib.publishEvent('b', `${plusJoin}`, false);
    }
    
  }
  
  useEffect(() => {
    // Map decibels to the volume range (0 to 20)
    if (!isMuted){
        // const mappedVolume = Math.round((initialVolume * 20) / 65535);
        setVolume(initialVolume);
    }
    
  }, [initialVolume]);


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
        <button className="bg-info border-0 rounded-circle me-2 volumeButton" 
          onClick={handleDecreaseOnClick}
          onMouseDown={handleDecreaseOnMouseDown}
          onMouseUp={handleDecreaseOnMouseUp}
          onMouseLeave={handleDecreaseOnMouseUp}
          onTouchStart={handleDecreaseOnMouseDown}
          onTouchEnd={handleDecreaseOnMouseUp}>
            <img
                src={RemoveIcon}
                alt="Minus Icon"
                className="img-fluid"/>
        </button>
        <div className="squaresContainer me-2">{renderSquares()}</div>
        <button className="bg-info border-0 rounded-circle volumeButton" 
          onClick={handleIncreaseOnClick}
          onMouseDown={handleIncreaseOnMouseDown}
          onMouseUp={handleIncreaseOnMouseUp}
          onMouseLeave={handleIncreaseOnMouseUp}
          onTouchStart={handleIncreaseOnMouseDown}
          onTouchEnd={handleIncreaseOnMouseUp}>
            <img
                src={AddIcon}
                alt="Plus Icon"
                className="img-fluid"/>
        </button>
        
    </div>
  );
};

export default VolumeControl;

