import * as React from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import SourceMenus from './SourceMenus';
import './HomePage.css'


function HomePage(){



    return(
        <div className='HomePage'>
            <Header/>
            <div className='mainContent col-6 pl-0'>
                <SourceMenus className=''/>
            </div>
            <div className="">
                <BottomBar />
            </div>
        </div>
    )

}

export default HomePage;