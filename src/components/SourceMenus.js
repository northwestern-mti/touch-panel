import React from 'react';
import { Button } from 'react-bootstrap';
import PcIcon from './Icons/pc-display.svg';
import LaptopIcon from './Icons/laptop.svg';
import WirelessIcon from './Icons/Wireless with Solstice Icon.svg';
import TelephoneIcon from './Icons/telephone.svg';
import JournalIcon from './Icons/journal-text.svg';
import DiscIcon from './Icons/disc.svg';


const SourceMenus = () => {
  return (
    <div className="">
      <Button className="d-flex col btn btn-light  border border-1 border-bottom border-dark py-4">
        <img
              src={PcIcon}
              alt='PC icon'
              className='img-fluid'/>
        <h5 className="h7">Resident Computer</h5>
      </Button>
      <Button className="d-flex col btn btn-light border border-1 border-bottom border-dark py-3">
        <img
              src={LaptopIcon}
              alt='Laptop icon'
              className='img-fluid'/>
        <h5 className="h7 mb-0">Laptop and Other Devices</h5>
      </Button>
      <Button className="d-flex col btn btn-light border border-1 border-bottom border-dark py-3">
        <img
              src={WirelessIcon}
              alt='Wireless icon'
              className='img-fluid'/>
        <h5 className="h7 mb-0">Wireless with Solstice</h5>
      </Button>
      <Button className="d-flex col btn btn-light border border-1 border-bottom border-dark py-3">
        <img
              src={TelephoneIcon}
              alt='Conference Call icon'
              className='img-fluid'/>
        <h5 className="h7 mb-0">Conference Call</h5>
      </Button>
      <Button className="d-flex col btn btn-light border border-1 border-bottom border-dark py-3">
        <img
              src={JournalIcon}
              alt='Document Camera icon'
              className='img-fluid'/>
        <h5 className="h7 mb-0">Document Camera</h5>
      </Button>
      <Button className="d-flex col btn btn-light border border-0 border-bottom border-dark py-3">
        <img
              src={DiscIcon}
              alt='Blu-Ray icon'
              className='img-fluid'/>
        <h5 className="h7 mb-0">Blu-Ray</h5>
      </Button>
    </div>
  );
};

export default SourceMenus;
