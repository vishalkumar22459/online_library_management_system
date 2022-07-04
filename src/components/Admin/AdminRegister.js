import "../../Css/Dashboard.css"
import { useLocation } from "react-router-dom";
import React,{useState ,useEffect} from 'react'
import { Link } from "react-router-dom";
// import Signup from '../Signup/signup'
import axios from "axios";
import '../../Css/adminregister.css'

export default function AdminRegister(){
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regContact = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const [isActive, setActive] = useState("false");
    const [email , setEmail] = useState('');
    const location = useLocation();
    const [is_render,setIsRender]=useState(false)

    const[addname , setAddname] = useState('');
    const[addemail , setAddemail] = useState('');
    const[addcontact , setAddcontact] = useState('');
    const[addpassword1, setAddpassord1] = useState('');
    const[addpassword2 , setAddpassword2] = useState('');
    const[addrole , setAddrole] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactError, setContactError] = useState('');
    
    
   
    
    useEffect(()=> {
        const token =window.localStorage.getItem('accessToken');
        if(!token){
            window.location.href='/';
        }else{
            setIsRender(true);
        }
        setEmail(location.state)
    },[])

    const registeruser =(e)=>{
        e.preventDefault();
        if(!regContact.test(addcontact)){
            return setContactError("Add a valid contact no")
        }
        if (!regEmail.test(addemail)) {
           return setEmailError('Enter valid Email!');
        } else {
            setEmailError('')
            if(addpassword1 !== addpassword2){
               return setPasswordError("password mismatch!  TRY AGAIN");
            }else{
                setPasswordError('');
            }
        }
        
       
        if(!addname || !addemail || !addcontact || !addpassword1 || !addpassword2 || !addrole){
            window.alert("Fill every details!");
        }else{
            // send to backend here
            const regdata = {
                name: addname,
                email: addemail,
                contact: addcontact,
                password: addpassword1,
                role: addrole
            }
            axios.post("http://localhost:4000/signup",regdata)
            .then(Response =>{
                console.log(Response);
            })
            .catch(error => {
                console.log(error)
            })
        }
        document.forms["myform"].reset();
        alert("user registered successfully");
        
    }

    function logout(){
        window. localStorage.clear('accessToken');
        window.location.href='/';
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
                    <div className="sidebar-header" >
                        <h3>Welcome To Library </h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>Admin Page</p>
                        <li >
                            <Link to={`/admindashboard`} 
                            state={location.state}>Home
                            </Link>
                        </li>
                        <li className="active">
                            <a> Register user</a>
                        </li>
                        <li>
                            <Link to={`/allstudents`} 
                            state={location.state}>Students
                            </Link>
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

                    {/* <div>{location.state}</div> */}
                    <div className="registerdivadmin responsive col-md col-md-offset-4" >
                        {/* <Signup /> */}
                        <h3 className="heading" >Register a user</h3>
                        <form  id="myform" style={{margin: "20px 20px 0 20px"}} >
                            <div class="row" style={{margin: "20px 20px 0 20px"}}>
                                <div class="col">
                                <label className="label" >Full Name</label>
                                <input type="text" class="form-control" placeholder="Name" value={addname} onChange={(e)=> setAddname(e.target.value)} />
                                </div>
                                <div class="col">
                                <label className="label" >Email</label>
                                <input type="email" class="form-control" placeholder="Email" value={addemail} onChange={(e)=> setAddemail(e.target.value)}/>
                                <div >
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{emailError}
                                    </span>
                                </div>
                                </div>
                                
                            </div>
                            <div class="row" style={{margin: "20px 20px 0 20px"}}>
                                <div class="col">
                                <label className="label" >Contact</label>
                                <input  class="form-control" placeholder="Contact" value={addcontact} onChange={(e)=> setAddcontact(e.target.value)} />
                                <div >
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{contactError}
                                    </span>
                                </div>
                                </div>
                                <div class="col">
                                <label className="label" >Password</label>
                                <input type="password" class="form-control" placeholder="Password" value={addpassword1} onChange={(e)=> setAddpassord1(e.target.value)}/>
                                </div>
                            </div>
                            <div class="row" style={{margin: "20px 20px 0 20px"}}>
                                <div class="col">
                                <label className="label" >Confirm Password</label>
                                <input type="password" class="form-control" placeholder="Confirm Password" value={addpassword2} onChange={(e)=> setAddpassword2(e.target.value)}/>
                                <div >
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{passwordError}
                                    </span>
                                </div>
                                </div>
                                <div class="col">
                                    <label className="label" >Select Role</label>
                                    <select type="text" id="form3Example4cg" className="form-control" value={addrole} onChange={(e)=> setAddrole(e.target.value)}>
                                        <option>Select</option>
                                        <option >Admin</option>
                                        <option>Student</option>
                                        <option >Librarian</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="row" style={{padding: "20px 250px 0 250px"}}>
                                <button className="btn btn-secondary" onClick={registeruser}>Register</button>
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