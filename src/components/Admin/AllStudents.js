import "../../Css/Dashboard.css"
import { useLocation } from "react-router-dom";
import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import {BsFillArchiveFill,BsFillPenFill} from 'react-icons/bs'
// import Signup from '../Signup/signup'

export default function AllStudents(){
    const [isActive, setActive] = useState("false");
    const [email , setEmail] = useState('');
    const location = useLocation();
    let [Userarr , setUserarr] = useState([]);
    const [userId , setUserId] = useState('');
    const [updateUserName , setUpdateUserName] = useState('');
    const [updateUserEmail , setUpdateUserEmail] = useState('');
    const [updateUserContact, setUpdateUserContact] = useState('');
    const [is_render,setIsRender]=useState(false)
    // const [bookid , setBookid] = useState();
    
    
     
    useEffect(()=> {
        const token =window.localStorage.getItem('accessToken');
        if(!token){
            window.location.href='/';
        }else{
            setIsRender(true);
        }
        setEmail(location.state)
        axios.get("http://localhost:4000/studentlist")
        .then((response) => {
            setUserarr(response.data.students);
            // console.log(response.data.book)
        })
    },[])

    
        
    function handleupdateUser(studentid , name,email,contact){
        // document.getElementById("user-info").style.display='none'
        var x = document.getElementById("updatebook-user-box");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        setUserId(studentid)
        setUpdateUserName(name)
        setUpdateUserEmail(email)
        setUpdateUserContact(contact)
        // alert(studentid + " "+ name + " "+  email+ " "+ contact)
    }
    function updateUser(){
        // if(!userId || !updateUserName || !updateUserEmail || !updateUserContact){
        //     alert("fill details cor")
        // }
        const obj = {
            studentid:userId,
            name:updateUserName,
            email:updateUserEmail,
            contact:updateUserContact
        }
        // alert(" "+obj.studentid +" "+obj.name+" "+obj.email+" "+obj.contact)
        axios.post('http://localhost:4000/update-users-data',obj)
        window.location.href='/allstudents';
    }

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
    
    function handleremoveStudent(studentid){
        // alert(studentid)
        const obj = {
            studentid:studentid
        }
        axios.post('http://localhost:4000/removeusers',obj)
        window.location.href='/allstudents';
    }





    function handleToggle(){
        setActive(!isActive);
    }
    return(
        // style={{margin: "0 0 0-250px"}}
        <>
        {is_render?(
        <div>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" style={isActive ? {} :{margin: "0 0 0-250px"}}>
                    <div className="sidebar-header">
                        <h3>Welcome To Library </h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>Admin Page</p>
                        <li >
                            <Link to={`/admindashboard`} 
                            state={location.state}>Home
                            </Link>
                        </li>
                        <li >
                            <Link to={`/adminregister`} 
                            state={location.state}>Register User
                            </Link>
                        </li>
                        <li className="active">
                            <a> Students</a>
                        </li>
                        <li>
                            <Link to={`/alllibrarians`} 
                            state={location.state}>Librarians
                            </Link>
                        </li>
                        <li>
                            <a> Contact</a>
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
                                <i class="fas fa-align-justify"></i>
                                <a onClick={logout} >LogOut</a>
                            </button>
                
                        </div>
                    </nav>
                    {/* all students */}

                    {/* <div> All Students Here</div> */}
                    <button onClick={hideme} className="btn btn-outline-success d-inline-block ml-auto" id="show-detail" type="button" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                        <a  >Show-Hide </a>
                    </button>
                    
                    <div className="tablediv table-responsive" id="user-info">
                        <h5 className="heading">All Registered Students </h5>
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-xs-1 text-center">Sr.no</th>
                                <th className="col-xs-1 text-center">Student Id</th>
                                <th className="col-xs-1 text-center">Student Name</th>
                                <th className="col-xs-1 text-center">Email Address</th>
                                <th className="col-xs-1 text-center">Contact No.</th>
                                <th className="col-xs-1 text-center">remove</th>
                                <th className="col-xs-1 text-center">update</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Userarr.length !== 0 ? (
                                Userarr.map((val, index) => {
                                return (
                                    <tr  key={index+1}>
                                        <td className="col-xs-1 text-center">{index+1}</td>
                                        <td className="col-xs-1 text-center">{val.studentid}</td>
                                        <td className="col-xs-1 text-center" > {val.name}</td>
                                        <td className="col-xs-1 text-center">{val.email}</td>
                                        <td className="col-xs-1 text-center">{val.contact}</td>
                                        <td className="col-xs-1 text-center" style={{color: "#8b1919"}} >
                                            <BsFillArchiveFill 
                                            style={{cursor: "pointer"}} 
                                            onClick={()=>{handleremoveStudent(val.studentid)}} />
                                        </td>
                                        <td className="col-xs-1 text-center" id="c" style={{color: "#445e11"}}>
                                            <BsFillPenFill 
                                            style={{cursor: "pointer"}} 
                                            onClick={()=>{handleupdateUser(val.studentid , val.name,val.email,val.contact)}} />
                                        </td>
                                        
                                    </tr>
                                );
                                        
                                })
                                ) : (
                                    <p style={{ textAlign: "center" }}> No Users</p>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    {/* all students ends here*/}
                    <div className="udate-user-box responsive" id="updatebook-user-box"  style={{display:'none'}}>
                        <h5 className="heading">Update Here</h5>
                        <div className="form-group responsive">
                            <label >Librarians Name</label>
                            <input type="text" value={updateUserName} onChange={(e)=>setUpdateUserName(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group responsive">
                            <label >Email Address</label>
                            <input type="text" value={updateUserEmail} onChange={(e)=>setUpdateUserEmail(e.target.value)} className="form-control"  />
                        </div>
                        <div className="form-group responsive">
                            <label>Contact no.</label>
                            <input type="text"  value={updateUserContact} onChange={(e)=>setUpdateUserContact(e.target.value)} className="form-control"  />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-success" onClick={updateUser} >Update</button>
                        </div>
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