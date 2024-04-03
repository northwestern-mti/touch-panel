import { useEffect, useState } from "react";
import CrComLib from "@crestron/ch5-crcomlib";
import {Button} from 'react-bootstrap';
import AddIcon from './Icons/plus.svg';
import RemoveIcon from './Icons/dash.svg';
import './VolumeControl.css'

const VolumeControl = ({initialVolume, plusJoin, minusJoin, isMuted, volumeJoin}) => {
  const [volume, setVolume] = useState(0);


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
        <button className="bg-info border-0 rounded-circle me-2 volumeButton" onClick={handleDecreaseVolume}>
            <img
                src={RemoveIcon}
                alt="Minus Icon"
                className="img-fluid"/>
        </button>
        <div className="squaresContainer me-2">{renderSquares()}</div>
        <button className="bg-info border-0 rounded-circle volumeButton" onClick={handleIncreaseVolume}>
            <img
                src={AddIcon}
                alt="Plus Icon"
                className="img-fluid"/>
        </button>
        
    </div>
  );
};

export default VolumeControl;

