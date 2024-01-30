import * as React from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import SourceMenus from './SourceMenus';
import './HomePage.css'


function HomePage(){



    return(
        <div className='HomePage d-flex flex-column w-100'>
            <Header className="m-0"/>
            <div className='mainContent col-12'>
                <SourceMenus className=''/>
            </div>
            <div className="">
                <BottomBar />
            </div>
        </div>
    )

}

export default HomePage;