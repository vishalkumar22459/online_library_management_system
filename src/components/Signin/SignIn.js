
import { Link} from "react-router-dom";
import React, { useState } from "react";
import validator from 'validator';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'



 export default function SignIn(){
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const Navigate = useNavigate();
    let role  = '';
    let msg = '';
    

    
    
    
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
        setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("submit button clicked");
        const formdata = {
            email:email,
            password:password,
        }
        //console.log(formdata);
        if(email !== '' && password !== '' )
        {
        axios.post('http://localhost:4000/signin',formdata)
            .then(Response =>{
                msg = Response.data.msg;
                role = Response.data.role;
                if(msg){
                    console.log(msg)
                }

                // console.log(Response.data.cookie)
                window.localStorage.setItem('accessToken',Response.data.token);
                if(role === 'Librarian'){
                    Navigate('/librariandashboard',{state:email});
                }else if(role === 'Student'){
                    Navigate('/studentdashboard',{state:email});
                }else if(role === 'Admin'){
                    Navigate('/admindashboard',{state:email});
                }else{
                    window.alert(msg)
                }
                
            })
            .catch(error => {
                console.log(error)
            })
           

        }else{
            window.alert("PLEASE FILL ALL THE ENTRIES !")
        }
       
    }
     
     return(
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6 col-md-6 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                    <div className="card-body p-5 text-center">

                        <h3 className="mb-1">Sign in</h3>

                        <div className="form-outline mb-0">
                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                        <input type="email" name="username" value={email} id="typeEmailX-2" className="form-control form-control-m"  onChange={(e)=> setEmail(e.target.value) } onKeyPress={validateEmail}/>
                            <span style={{
                            color: 'red',
                            fontSize:15
                            }}>{emailError}</span>
                        </div>

                        <div className="form-outline mb-0">
                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value) } name="password" id="typePasswordX-2" className="form-control form-control-m" />
                        </div>

                        

                        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleSubmit}>Login</button>
                        
                        <Link to ='/signup'>
                            <button className="btn btn-secondary btn-lg btn-block" >Register</button>
                        </Link>
                        <hr className="my-4"/>
                    </div>
                </div>
            </div>
            </div>
        </div>
     );
 }