import * as React from 'react';
import Header from './Header';
import BottomBar from './BottomBar';
import SourceMenus from './SourceMenus';


function HomePage(){



    return(
        <div className='HomePage'>
            <Header/>
            <div className='mainContent col-3 pl-0'>
                <SourceMenus className=''/>
            </div>
            <div className="fixed-bottom text-center p-3">
                <BottomBar />
            </div>
        </div>
    )

}

export default HomePage;