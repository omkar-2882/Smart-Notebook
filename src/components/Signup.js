import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './signup.css'

export const Signup = (props) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" })

    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = creds
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history.push("/")
            props.showAlert("success", "Successfully Sign up")
        }
        else {
            props.showAlert("danger", "Invalid credentials")
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
        // console.log(creds)
    }
    return (
        <>
            {/* <div id="pcontainer" className='d-flex'>
                <div id="scontainer" className='container'>
                    <h2 className='text-center'>Create New Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange} value={creds.name} required minLength={5} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} value={creds.email} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={creds.password} required minLength={5} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange} value={creds.cpassword} required minLength={5} />
                        </div>
                        <div className='text-center'>
                            <button disabled={creds.password !== creds.cpassword} type="submit" className="btn btn-primary cblueviolet">Sign In</button>
                        </div>
                    </form>
                </div>

                <div id="s1container" className='container text-center '>
                    <div className="center">
                        <h2 className=''>Welcome Back</h2>
                        <p>Already have an account ?</p>
                        <Link to="./login" type="submit" className="btn btn clight" >Login</Link>
                    </div>
                </div>
            </div> */}

            <div id="container" className="container">
                <div className="myCard">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex myLeftCtn justify-content-center">
                                <form id="myForm" className="text-center" onSubmit={handleSubmit}>
                                    <header>Create New Account</header>
                                    <div className="form-group">
                                        <i className="fas fa-user"></i>
                                        <input className="myInput" type="text" placeholder="Username" id="name" name="name" onChange={onchange} value={creds.name} required minLength={5} />
                                    </div>

                                    <div className="form-group">
                                        <i className="fas fa-envelope"></i>
                                        <input className="myInput" placeholder="Email" type="text" value={creds.email} id="email" name="email" required onChange={onchange} />
                                    </div>

                                    <div className="form-group">
                                        <i className="fas fa-lock"></i>
                                        <input className="myInput" type="password" value={creds.password} id="password" name="password" placeholder="Password" required onChange={onchange} />
                                    </div>
                                    <div className="form-group">
                                        <i className="fas fa-lock"></i>
                                        <input className="myInput" type="password" value={creds.cpassword} id="password" name="cpassword" placeholder="Confirm Password" required onChange={onchange} />
                                    </div>

                                    <div className="form-group ">
                                        <label>
                                            <input id="check_1" name="check_1" type="checkbox" required /><small> I read and agree to Terms & Conditions</small>
                                            <div className="invalid-feedback">You must check the box.</div>
                                        </label>
                                    </div>

                                    <button disabled={creds.password !== creds.cpassword} type="submit" className="btn butt" >SIGN UP</button>

                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="myRightCtn">
                                <div className="box"><header>Welcome Back!</header>
                                    <p>Already have an account ?</p>
                                    <Link to="./login" type="submit" className="btn butt_out">LOGIN</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
