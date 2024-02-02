import React from 'react';
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import PcIcon from './Icons/pc-display.svg';
import LaptopIcon from './Icons/laptop.svg';
import WirelessIcon from './Icons/Wireless with Solstice Icon.svg';
import TelephoneIcon from './Icons/telephone.svg';
import JournalIcon from './Icons/journal-text.svg';
import DiscIcon from './Icons/disc.svg';
import DisplayArea from './DisplayArea';
import './SourceMenus.css';


const SourceMenus = () => {
    const [selectedButton, setSelectedButton] = useState(false);
    const [inputSelected, setInputSelected] = useState('');
    const [source, setSource] = useState('');
    const [showDesktop, setShowDesktop] = useState(false);
    const [showLaptop, setShowLaptop] = useState(false);
    const [showWireless, setShowWireless] = useState(false);
    const [showBluray, setShowBluray] = useState(false);
    const [showDocCam, setShowDocCam] = useState(false);

    useEffect(() => {
        window.CrComLib.subscribeState('b', '211', value=> setShowDesktop(value));
        window.CrComLib.subscribeState('b', '212', value=> setShowLaptop(value));
        window.CrComLib.subscribeState('b', '213', value=> setShowWireless(value));
        window.CrComLib.subscribeState('b', '214', value=> setShowBluray(value));
        window.CrComLib.subscribeState('b', '215', value=> setShowDocCam(value));
        
    }, []);

    const handleSourceSelected = (joinNumber,sourceId) => {
        setSelectedButton(true);
        if (joinNumber !== inputSelected) {
            if (inputSelected === ''){
                setInputSelected(`${joinNumber}`);
                setSource(sourceId);
                window.CrComLib.publishEvent('b', `${joinNumber}`, true);
                window.CrComLib.publishEvent('b', `${joinNumber}`, false);
                console.log("signal sent to join number:" + `${joinNumber}`)
            } else {
                console.log('transfering signal from: ' +`${inputSelected}`+ ' to ' + `${joinNumber}` )
                setInputSelected(`${joinNumber}`);
                setSource(sourceId);
                window.CrComLib.publishEvent('b', `${joinNumber}`, true);
                window.CrComLib.publishEvent('b', `${joinNumber}`, false);
                console.log("signal sent to join number:" + `${joinNumber}`)   
            }
        } 
    }

    const toggleDisplay = (display) => {
        window.CrComLib.publishEvent('b', `${display}`, true);
        window.CrComLib.publishEvent('b', `${display}`, false);
        console.log('source sent to projector')
    }    

    return (
    <div className="row">
        <div className='display1 col-3 ml-0' onClick={()=>toggleDisplay('18')}>
            <div className='row border-bottom border-dark border-right-0'
                onClick={() => handleSourceSelected('200', 'PC')}>
                <div className='d-flex col  py-4'>
                    <img
                        src={PcIcon}
                        alt='PC icon'
                        className='img-fluid pl-2'/>
                    <h5 className="h7 mb-0">Resident Computer</h5>
                </div>
                <div className={`select ${(source == 'PC') ? 'bg-primary' : ''}`}></div>
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('201', 'Laptop')}>
                <div className='d-flex col  py-4'>
                    <img
                        src={LaptopIcon}
                        alt='Laptop icon'
                        className='img-fluid pl-2'/>
                    <h5 className="h7 mb-0">Laptop and Other Devices</h5>
                </div>
                <div className={`select ${(source == 'Laptop') ? 'bg-primary' : ''}`}></div> 
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('202', 'Wireless')}>
                <div className='d-flex col  py-4'>
                    <img
                        src={WirelessIcon}
                        alt='Wireless icon'
                        className='img-fluid pl-2'/>
                    <h5 className="h7 mb-0">Wireless with Solstice</h5>
                </div>
                <div className={`select ${(source == 'Wireless') ? 'bg-primary' : ''}`}></div>
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('205', 'ConfCall')}>
                <div className='d-flex col  py-4'>
                    <img
                        src={TelephoneIcon}
                        alt='Telephone icon'
                        className='img-fluid pl-2'/>
                    <h5 className="h7 mb-0">Conference Call</h5>
                </div>
                <div className={`select ${(source == 'ConfCall') ? 'bg-primary' : ''}`}></div>   
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('204', 'DocCam')}>
                <div className='d-flex col  py-4'>
                    <img
                        src={JournalIcon}
                        alt='Journal icon'
                        className='img-fluid pl-2'/>
                    <h5 className="h7 mb-0">Document Camera</h5>
                </div>
                <div className={`select ${(source == 'DocCam') ? 'bg-primary' : ''}`}></div>
                
            </div>
            <div className="row border-bottom-0 border-dark border-right-0"
                onClick={() => handleSourceSelected('203', 'BluRay')}>
                <div className='d-flex col  py-4'>
                    <img
                        src={DiscIcon}
                        alt='Disc icon'
                        className='img-fluid pl-2'/>
                    <h5 className="h7 mb-0">Blu-Ray</h5>
                </div>
                <div className={`select ${(source == 'BluRay') ? 'bg-primary' : ''}`}></div>
                
            </div>
        </div>
        <div className='col col-3 mt-0 border-right border-dark  pr-0'>
            <DisplayArea sourceSelected={source} displayJoin={'253'} side='left' />
        </div>
        <div className='col col-3 mt-0 pl-0 '>
            <DisplayArea sourceSelected={source} displayJoin={'260'} side='right' />
        </div>
        <div className='display2 col-3 mr-0' onClick={()=>toggleDisplay('18')}>
            <div className='row border-bottom border-dark border-right-0'
                onClick={() => handleSourceSelected('200', 'PC')}>
                <div className={`select ${(source == 'PC') ? 'bg-primary' : ''}`}></div>
                <div className='d-flex col  py-4 mr-0'>
                    <img
                        src={PcIcon}
                        alt='PC icon'
                        className='img-fluid'/>
                    <h5 className="h7 mb-0">Resident Computer</h5>
                </div>
                
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('201', 'Laptop')}>
                <div className={`select ${(source == 'Laptop') ? 'bg-primary' : ''}`}></div>
                <div className='d-flex col  py-4 mr-0'>
                    <img
                        src={LaptopIcon}
                        alt='Laptop icon'
                        className='img-fluid'/>
                    <h5 className="h7 mb-0">Laptop and Other Devices</h5>
                </div> 
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('202', 'Wireless')}>
                <div className={`select ${(source == 'Wireless') ? 'bg-primary' : ''}`}></div>
                <div className='d-flex col  py-4 mr-0'>
                    <img
                        src={WirelessIcon}
                        alt='Wireless icon'
                        className='img-fluid'/>
                    <h5 className="h7 mb-0">Wireless with Solstice</h5>
                </div>
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('205', 'ConfCall')}>
                <div className={`select ${(source == 'ConfCall') ? 'bg-primary' : ''}`}></div> 
                <div className='d-flex col  py-4'>
                    <img
                        src={TelephoneIcon}
                        alt='Telephone icon'
                        className='img-fluid '/>
                    <h5 className="h7 mb-0">Conference Call</h5>
                </div>  
            </div>
            <div className="row border-bottom border-dark border-right-0"
                onClick={() => handleSourceSelected('204', 'DocCam')}>
                <div className={`select ${(source == 'DocCam') ? 'bg-primary' : ''}`}></div>
                <div className='d-flex col  py-4'>
                    <img
                        src={JournalIcon}
                        alt='Journal icon'
                        className='img-fluid'/>
                    <h5 className="h7 mb-0">Document Camera</h5>
                </div>
                
                
            </div>
            <div className="row border-bottom-0 border-dark border-right-0"
                onClick={() => handleSourceSelected('203', 'BluRay')}>
                <div className={`select ${(source == 'BluRay') ? 'bg-primary' : ''}`}></div>
                <div className='d-flex col  py-4'>
                    <img
                        src={DiscIcon}
                        alt='Disc icon'
                        className='img-fluid '/>
                    <h5 className="h7 mb-0">Blu-Ray</h5>
                </div>
                
                
            </div>
        </div>
        
        
    </div>
  );
};

export default SourceMenus;
