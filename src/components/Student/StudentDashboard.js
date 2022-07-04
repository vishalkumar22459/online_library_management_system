import "../../Css/Dashboard.css"
import React,{useState} from 'react'
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StudentDashboard(){
    const [isActive, setActive] = useState("false");
    const location = useLocation();const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [name , setName] = useState(''); const [editname , setEditname] =useState('');
    const [email , setEmail] = useState('');const [editemail, setEditemail]=useState('');
    const [contact ,setContact] = useState('');const [editcontact, setEditcontact]=useState('');
    const [role , setRole] = useState('')
    const [is_render,setIsRender]=useState(false)

    var arr= location.state
    // setName(location.state[0])
    // window.alert(location.state)
    useEffect(()=>{
        const token =window.localStorage.getItem('accessToken');
        if(!token){
            window.location.href='/';
        }else{
            setIsRender(true);
        }
        const obj={
            email:location.state
        }
        axios.post('http://localhost:4000/getdata',obj)
        .then(response =>{
                setName(response.data.name)
                setEmail(response.data.email)
                setContact(response.data.contact)
                setRole(response.data.role)
        })
        .catch(e=>{
            if(e)throw e;
        })
    })
        


    function hideme(){
        var x = document.getElementById("user-info");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }
    function logout(){
        window. localStorage.clear('accessToken');
        window.location.href='/';
    }
    
    function changeName(){
        setShow('true')   
    }
    function updateName(){
        const obj ={
            email : email
        }
        obj.name=editname
        console.log(editname)
        
        axios.post('http://localhost:4000/updatename',obj)
        .then(Response => {
            // alert(Response)
        })
        .catch(e => {
            if(e) throw e;
        })
        window.location.href='/studentdashboard';
    }
    function changeContact(){
        setShow1('true')   
    }
    function updateContact(){
        const obj ={
            email : email
        }
        obj.contact=editcontact        
        axios.post('http://localhost:4000/updatecontact',obj)
        .then(Response => {
            alert(Response)
        })
        .catch(e => {
            if(e) throw e;
        })
        window.location.href='/studentdashboard';
    }







    function handleToggle(){
        setActive(!isActive);
    }
    return(
        <>
        {is_render?(
        <div>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" style={isActive ? {} :{margin: "0 0 0-250px"}}>
                    <div className="sidebar-header" >
                        <h3>Welcome To Library </h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>StudentPage</p>
                        <li className="active">
                            <a>Home</a>
                        </li>
                        <li>
                            <Link to={`/books`} 
                            state={email}>Books
                            </Link>
                        </li>
                
                        <li>
                            <a>Contact</a>
                        </li>
                    </ul>
                </nav>

                {/* <!-- Page Content  --> */}
                <div id="content">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={handleToggle}>
                                <i className="fas fa-align-left"></i>
                                <span>Toggle Sidebar</span>
                            </button>
                            <button className="btn btn-dark "  type="button" >
                                <i className="fas fa-align-justify"></i>
                                <a onClick={logout} >LogOut</a>
                            </button>
                
                        </div>
                    </nav>

                    {/* Showing details of user */}
                    <div className="personal-detail">
                        <button onClick={hideme} className="btn btn-outline-success d-inline-block ml-auto" id="show-detail" type="button" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-align-justify"></i>
                            <a  >Hide-Show</a>
                        </button>
                        
                        <div className='user-info' id="user-info">
                            <h3 className="heading">MyDetails</h3>
                            <div className='user-details'>
                                <div>
                                    <p className="text-dark">Name : {name} <FaEdit onClick={changeName} /></p>
                                    {show ? 
                                    <div>
                                        <input type="text" value={editname} onChange={e=> setEditname(e.target.value)}  />
                                        <button onClick={updateName}>Update</button>
                                    </div>
                                    : null}
                                </div>
                                <div>
                                    <p className="text-dark">Email : {email} </p>
                                    
                                </div>
                                <div>
                                    <p className="text-dark">Contact : {contact} <FaEdit onClick={changeContact} /> </p>
                                    {show1 ? 
                                    <div>
                                        <input type="text" value={editcontact} onChange={e=> setEditcontact(e.target.value)}  />
                                        <button onClick={updateContact}>Update</button>
                                    </div>
                                    : null}
                                </div>
                                <div>
                                    <p className="text-dark">Role : {role}  </p>
                                </div>
                                
                            </div>
                        </div>
                        {/* end of Showing details of user */}

                        <br /> <br />
                        {/* <div>{email}</div> */}























                        
                    </div>























                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div className="line"></div>

                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div className="line"></div>

                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <div className="line"></div>

                    <h3>Lorem Ipsum Dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                </div>
            </div>
        </div>
        ):(<p></p>)}
        </>
    );
}