import axios from 'axios';
import React from 'react'
import { useState } from 'react'
// import '../../Css/test.css'

export default function Signup(){
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regContact = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const [Name ,setName] = useState('')
    const [Email ,setEmail] = useState('')
    const [Role ,setRole] = useState('')
    const [PasswordOne ,setPasswordOne] = useState('')
    const [PasswordTwo ,setPasswordTwo] = useState('')
    const [Contact ,setContact] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactError, setContactError] = useState('');

    

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!regContact.test(Contact)){
            return setContactError("Add a valid contact no")
        }
        if (!regEmail.test(Email)) {
            setEmailError('Enter valid Email!');
        } else {
            setEmailError('')
            if(PasswordOne !== PasswordTwo){
                setPasswordError("password mismatch!  TRY AGAIN");
            }else{
                setPasswordError('');
            }
        }
        if(!Name || !Email || !Contact || !PasswordOne || !PasswordTwo || !Role){
            window.alert("Fill every details!");
        }else{
            // send to backend here
            const regdata = {
                name: Name,
                email: Email,
                contact: Contact,
                password: PasswordOne,
                role: Role
            }
            axios.post("http://localhost:4000/signup",regdata)
            .then(Response =>{
                console.log(Response);
            })
            .catch(error => {
                console.log(error)
            })
            window.location.href = '/';
        }
    }

    return(
       <div>
           <section className="vh-100 bg-image" style={{backgroundImage: `url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")`}}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card" >
                            <div className="card-body p-3">
                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                            <form>

                                <div className="form-outline mb">
                                <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={Name} onChange={(e)=> setName(e.target.value)}/>
                                </div>

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3cg" >Your Email</label>
                                <input type="email" id="form3Example2cg" className="form-control form-control-lg" value={Email} onChange={(e)=>setEmail(e.target.value)} />
                                <span style={{
                                    // border:'outset',
                                    color: 'red',
                                    fontSize:15,
                                    }}>{emailError}
                                </span>
                                </div>
                                
        

                                <div className="form-outline mb-4">
                                <label className="form-label" >Your Contact</label>
                                <input type="text" id="form3Example3cg" className="form-control form-control-lg" value={Contact} onChange={(e)=> setContact(e.target.value)}/>
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{contactError}
                                    </span>
                                </div>
                                

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                <input type="password" id="form3Example5cg" value={PasswordOne} onChange={(e)=> setPasswordOne(e.target.value)} className="form-control form-control-lg" />
                               </div>

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example4cdg">Confirm password</label>
                                <input type="password" id="form3Example6cdg" value={PasswordTwo} onChange={(e) => setPasswordTwo(e.target.value)}  className="form-control form-control-lg" />
                                <span style={{
                                    // border:'outset',
                                    color: 'red',
                                    fontSize:15,
                                    }}>{passwordError}
                                </span>
                                </div>

                

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example4cg">Your Role</label>
                                    <select type="text" id="form3Example4cg" className="form-control form-control-lg" value={Role} onChange={(e)=> setRole(e.target.value)}>
                                        <option>Select</option>
                                        {/* <option >Admin</option> */}
                                        <option>Student</option>
                                        <option >Librarian</option>
                                    </select>
                                </div>

                                {/* <div className="form-check d-flex justify-content-center mb-5">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    value=""
                                    id="form2Example3cg"
                                />
                                <label className="form-check-label" htmlFor="form2Example3g">
                                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                </label>
                                </div> */}

                                <div className="d-flex justify-content-center">
                                <button type="button" onClick={handleSubmit} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                </div>

                                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/" className="fw-bold text-body"><u>Login here</u></a></p>

                            </form>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

       </div>
    )
}