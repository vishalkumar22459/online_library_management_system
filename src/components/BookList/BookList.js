import axios from 'axios'
import React from 'react'
import { useState,useEffect  } from 'react';
import * as ReactBootsrap from 'react-bootstrap'
// import {useNavigate ,useLocation} from 'react-router-dom'


export default function Booklist(){
   
    // const Navigate = useNavigate();
    // const location = useLocation();
    // console.log(location.state)
    // console.log("3")
    let [arr , setArr] = useState([]);
     
    useEffect(()=> {
        axios.get("http://localhost:4000/booklist")
        .then((response) => {
            // console.log(response.data)
            setArr(response.data.book);
            // console.log(arr);
        })
    },[])
    
    console.log(arr)

    

    return(
        <>
        <div className='book-list'>
            <h1 className='heading'> Available Books </h1>
            <ReactBootsrap.Table striped bordered hover>
            <thead>
                <tr>
                    <th>book</th>
                    <th>author</th>
                </tr>
            </thead>
            <tbody>
                
                    {arr.length !== 0 ? (
                    arr.map((val, index) => {
                    return (
                        <tr key={index+1}>

                            <td > {val.bookname}</td>
                            <td>{val.author}</td>
                        </tr>
                    );
                    })
                    ) : (
                        <p style={{ textAlign: "center" }}> No Tasks</p>
                    )}
            </tbody>
            </ReactBootsrap.Table>
        </div>
        
         

            {/* {(arr.length!==0)? ("yes"):("no")} */}
        </>

          
    );
}