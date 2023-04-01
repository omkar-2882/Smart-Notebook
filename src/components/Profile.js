import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import '../profile.css'

export const Profile = (props) => {
    const {id, name, email, date, initial} = props.userDt
    const [localstorage, setlocalstorage] = useState(1)

    let history = useHistory()
    const handleLogout = () => {
        props.close()
        localStorage.removeItem('token')
        setlocalstorage(0)
        history.push('./login')
    }

        return (
            <>
                <div id="profileCard" className="card text-left align-items-center " style={{ width: "21rem", height: "26rem", margin: "auto", fontSize: "1rem"}}>
                    {/* <img style={{ width: "7rem"}} src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" className="card-img-top" alt="..." /> */}
                    <div id="profilepic" className="text-light">
                        <span>{initial}</span>
                    </div>
                    <div className="card-body p-0">
                        <h2 className="card-title text-light">{name}</h2>
                        {/* <p className="card-text"></p> */}
                    </div>
                    <ul style={{}} className="list-group list-group-flush">
                        <li className="list-group-item">Name: {name}</li>
                        <li className="list-group-item">Email: {email}</li>
                        <li className="list-group-item">Phone No.: 4388374733{ }</li>
                    </ul>
                    <div className="card-body">
                        {/* <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a> */}

                        <button onClick={handleLogout} className="text-light btn m-2">
                            <i className="fa-solid fa-right-from-bracket"></i><span className="ms-3 d-none d-sm-inline fa-lg ">Logout</span></button>
                    </div>
                </div>
            </>
        )
    }
