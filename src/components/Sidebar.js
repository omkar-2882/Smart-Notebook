import React, { Profiler } from 'react'
import { useEffect, useState, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Profile } from './Profile'

export const Sidebar = () => {
    const host = "http://localhost:5000"

    // const [user, setUser] = useState(null);
    const [localstorage, setlocalstorage] = useState(1)
    const cref = useRef(null)
    let history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload();
        setlocalstorage(0)
        history.push('./login')
    }

    const close = () => {
        cref.current.click()
    }

    const [userDt, setuserDt] = useState({})

    const getUser = async () => {
        // API CALL
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        json.initial = json.name[0]
        console.log(json)
        setuserDt(json)
    }
    
    // let location = useLocation()
    return (
        <>
            <div id="nav" className='navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between align-items-center fixed-top top-0'>
                <button id="hamicon" className="btn shadow-none mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" role="" aria-controls="offcanvasWithBothOptions">
                    <i className="fa-solid fa-bars fa-xl"></i>
                </button>
                <Link className="nav-link nav-link" to="./">
                    <div className='logo d-flex justify-content-center align-items-center gap-4'>
                        <i className="fa-solid fa-pencil fa-2xl"></i>
                        <h2 className='cName m-0'>Smart NoteBook</h2>
                    </div>
                </Link>
                {
                    <button disabled={!localStorage.getItem('token')} id="profile" className="btn shadow-none mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onClick={getUser}>
                        <i className="fa-solid fa-user fa-xl"></i>
                    </button>
                }
            </div>

            <div className="offcanvas offcanvas-top transbg" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                    <button ref={cref} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ">
                    <Profile close={close} userDt={userDt} />
                </div>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                {/* <div className="offcanvas-header">
                    <h3 className="offcanvas-title d-none d-lg-block bv fw-bolder" id="offcanvas">Menu</h3>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div> */}
                <div className="offcanvas-body px-0">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start m-2" id="menu">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link nav-link text-truncate mx-3`}>
                                <i className="fa-solid fa-book bv"></i><span className="ms-3 d-none d-sm-inline bv">My Notes</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="./addnote" className={`nav-link nav-link text-truncate mx-3`}>
                                <i className="fa-solid fa-notes-medical bv"></i><span className="ms-3 d-none d-sm-inline bv">Add Note</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link text-truncate">
                            <i className="fa-solid fa-gauge"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                        </li> */}
                        {/* <li>
                            <Link to="#" className="nav-link text-truncate">
                                <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">Orders</span></Link>
                        </li> */}
                        {/* <li className="dropdown">
                            <Link to="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                            </Link>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                                <li><Link className="dropdown-item" to="#">New project...</Link></li>
                                <li><Link className="dropdown-item" to="#">Settings</Link></li>
                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                            </ul>
                        </li> */}
                        {/* <li>
                            <Link to="#" className="nav-link text-truncate">
                                <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline">Login</span></Link>
                        </li> */}
                        <li>
                            {
                                !localStorage.getItem('token') ?
                                    <div><Link to="./login" className="nav-link text-truncate ms-3">
                                        <i className="fa-solid fa-right-to-bracket bv"></i><span className="mx-3 d-none d-sm-inline bv">Login</span> </Link>
                                        <Link to="./signup" className="nav-link text-truncate ms-3">
                                            <i className="fa-solid fa-user-plus bv"></i><span className="ms-3 d-none d-sm-inline bv">Sign Up</span> </Link>
                                    </div>
                                    :
                                    <button onClick={handleLogout} className="nav-link text-truncate mx-3">
                                        <i className="fa-solid fa-right-from-bracket bv"></i><span className="ms-3 d-none d-sm-inline bv">Logout</span></button>
                            }
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
