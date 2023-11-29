import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./signup.css";

export const Login = (props) => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  let history = useHistory();
  const host = "http://localhost:5000"
  // const host = "https://smart-notebook-backend.vercel.app"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(host + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("success", "Successfully Logged In");
    } else {
      props.showAlert("danger", "Invalid credentials");
    }
  };
  const onchange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div id="container" className="container">
      <div className="myCard">
        <div id="row" className="row">
          <div id="col" className="col-md-6">
            <div className="d-flex myLeftCtn justify-content-center">
              <form className="myForm text-center" onSubmit={handleSubmit}>
                <header>Login To Continue</header>
                {/* <div className="form-group">
                                <i className="fas fa-user"></i>
                                <input className="myInput" type="text" placeholder="Username" id="username" required />
                            </div> */}

                <div className="form-group">
                  <i className="fas fa-envelope"></i>
                  <input
                    className="myInput"
                    placeholder="Email"
                    type="text"
                    value={creds.email}
                    id="email"
                    name="email"
                    required
                    onChange={onchange}
                  />
                </div>

                <div className="form-group">
                  <i className="fas fa-lock"></i>
                  <input
                    className="myInput"
                    type="password"
                    value={creds.password}
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={onchange}
                  />
                </div>

                {/* <div className="form-group ">
                                <label>
                                    <input id="check_1" name="check_1" type="checkbox" required /><small> I read and agree to Terms & Conditions</small>
                                    <div className="invalid-feedback">You must check the box.</div>
                                </label>
                            </div> */}

                <button type="submit" className="btn butt">
                  LOGIN
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="myRightCtn">
              <div className="box">
                <header>New User!</header>
                <p>Don't have an account ?</p>
                <Link to="./signup" type="submit" className="btn butt_out">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
