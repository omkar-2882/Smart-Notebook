import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './signup.css'

export const Signup = (props) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    const host = "http://localhost:5000"
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = creds
        const response = await fetch(host + "/api/auth/createuser", {
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
    }
    return (
        <>
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
                                        <input className="myInput" placeholder="Email" type="email" value={creds.email} id="email" name="email" required onChange={onchange} />
                                    </div>

                                    <div className="form-group">
                                        <i className="fas fa-lock"></i>
                                        <input className="myInput" type="password" value={creds.password} id="password" name="password" placeholder="Password" required onChange={onchange} />
                                    </div>
                                    <div className="form-group">
                                        <i className="fas fa-lock"></i>
                                        <input className="myInput" type="password" value={creds.cpassword} id="password" name="cpassword" placeholder="Confirm Password" required onChange={onchange} />
                                    </div>

                                    {/* <div className="form-group ">
                                        <label>
                                            <input id="check_1" name="check_1" type="checkbox" required /><small> I read and agree to Terms & Conditions</small>
                                            <div className="invalid-feedback">You must check the box.</div>
                                        </label>
                                    </div> */}

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
