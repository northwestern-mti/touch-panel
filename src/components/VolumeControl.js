import { useEffect, useState, useRef } from "react";
import CrComLib from "@crestron/ch5-crcomlib";
import {Button} from 'react-bootstrap';
import './VolumeControl.css'

const VolumeControl = ({plusJoin, minusJoin, isMuted, volumeJoin}) => {
  const [volume, setVolume] = useState(0);
  const pressIntervalRef = useRef(null);
  const prevVolumeRef = useRef(null);

  const CrSignalType = {
    'Boolean' : 'b',
  }

  useEffect(() => {
    if (!isMuted) {
      // window.CrComLib.subscribeState('o', volumeJoin, value => {
      //   if (value.hasOwnProperty('rcb')) {
      //     console.log('subscribe volume:', value['rcb']['value'])
      //     setVolume(value['rcb']['value'])
      //   }
      // })

      window.CrComLib.subscribeState('n', volumeJoin, value => {
        console.log('subscribe volume', typeof(value), value)
        setVolume(value)
      });

      // setVolume(initialVolume);
      // console.log('initial volume', initialVolume)
    }
    return () => {
      window.CrComLib.unsubscribeState('n', volumeJoin, volume);
    }
  }, []);

  const handleIncreaseVolume = () => {
    if (volume < 20) {
      setVolume((prevVolume) => prevVolume + 1);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${plusJoin}`, true);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${plusJoin}`, false);
      console.log('volume increased:', volume)
    }
  };

  const handleDecreaseVolume = () => {
    if (volume > 0) {
      setVolume((prevVolume) => prevVolume - 1);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${minusJoin}`, true);
      window.CrComLib.publishEvent(CrSignalType.Boolean, `${minusJoin}`, false);
    }
    console.log('volume decreased', volume)
  };

  const handleOnMouseDown = (change) => {
    if (pressIntervalRef.current !== null) {
      return;
    }
    pressIntervalRef.current = setInterval(() => {
      setVolume((prevVolume) => {
        const newVolume = prevVolume + change;
        if (newVolume >= 0 && newVolume <= 20) {
          console.log('volume changed', newVolume)
          window.CrComLib.publishEvent(CrSignalType.Boolean, change > 0 ? `${plusJoin}` :`${minusJoin}`, true);
          window.CrComLib.publishEvent(CrSignalType.Boolean, change > 0 ? `${plusJoin}` :`${minusJoin}`, false);
          return newVolume;
        }
        return prevVolume;
      })
    }, 200);
  }

  const handleRamping = (change) => {
    if (pressIntervalRef.current !== null) {
      return;
    }
    window.CrComLib.publishEvent('o', change > 0 ? `${plusJoin}` :`${minusJoin}`, {repeatdigital: true});
    pressIntervalRef.current = setInterval(() => {
      setVolume((prevVolume) => {
        const newVolume = prevVolume + change;
        if (newVolume >= 0 && newVolume <= 20) {
          console.log('volume changed', newVolume)
          window.CrComLib.publishEvent('o', change > 0 ? `${plusJoin}` :`${minusJoin}`, {repeatdigital: true});
         return newVolume;
        }
        return prevVolume;
      })
    }, 200);
  }

  const handleOnMouseUp = (change) => {
    if (pressIntervalRef.current) {
      clearInterval(pressIntervalRef.current);
      pressIntervalRef.current = null;
    }
    window.CrComLib.publishEvent(CrSignalType.Boolean, change > 0 ? `${plusJoin}` :`${minusJoin}`, false);
  }

  const handleRampingStop = (change) => {
    if (pressIntervalRef.current) {
      clearInterval(pressIntervalRef.current);
      pressIntervalRef.current = null;
    }
    window.CrComLib.publishEvent('o', change > 0 ? `${plusJoin}` :`${minusJoin}`, {repeatdigital: false});
  }

  const handleIncreaseOnTouchMove = (e) => {
    const incBtn = document.getElementById('increaseButton');
    const touch = e.touches[0];
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!incBtn.contains(targetEl)) {
      handleOnMouseUp(1);
    }
  }

  const handleDecreaseOnTouchMove = (e) => {
    const decBtn = document.getElementById('decreaseButton');
    const touch = e.touches[0];
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!decBtn.contains(targetEl)) {
      handleOnMouseUp(-1);
    }
  }

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
          onClick={handleDecreaseVolume}
          onMouseDown={() => handleOnMouseDown(-1)}
          onMouseUp={() => handleOnMouseUp(-1)}
          onMouseLeave={() => handleOnMouseUp(-1)}
          onTouchStart={() => handleOnMouseDown(-1)}
          onTouchEnd={() => handleOnMouseUp(-1)}
          onTouchCancel={() => handleOnMouseUp(-1)}
          onTouchMove={handleDecreaseOnTouchMove}>
            <i className="bi bi-dash-lg text-white fw-bold font-size-5 font-size-6-xl"></i>
        </button>
        <div className="squaresContainer me-2">{renderSquares()}</div>
        <button className="bg-info border-0 rounded-circle volumeButton" id="increaseButton"
          onClick={handleIncreaseVolume}
          onMouseDown={() => handleOnMouseDown(1)}
          onMouseUp={() => handleOnMouseUp(1)}
          onMouseLeave={() => handleOnMouseUp(1)}
          onTouchStart={() => handleOnMouseDown(1)}
          onTouchEnd={() => handleOnMouseUp(1)}
          onTouchCancel={() => handleOnMouseUp(1)}
          onTouchMove={handleIncreaseOnTouchMove}>
            <i className="bi bi-plus-lg text-white fw-bold font-size-5 font-size-6-xl"></i>
        </button>
    </div>
  );
};

export default VolumeControl;

