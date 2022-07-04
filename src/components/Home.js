import React from 'react'
import Navbar from './Navbar';
import Signin from './Signin/SignIn';



export default function homePage(e){
    
    return(
        <>
        <Navbar title={"MyLibrary"}/> 
        <div className='h-bg'>
            <Signin/>
         </div>
    
               
        </>
        
    );   
}