import './App.css';
import { Alert } from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
// import { Login } from './Login';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Profile } from './components/Profile';
import { AddNote } from './components/AddNote';
// import { Sidebar } from './components/Sidebar';

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })

    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  // window.addEventListener("unload", (ev) => {
  //   ev.preventDefault();
  //   // return ev.returnValue = 'Are you sure you want to close?';
  //   localStorage.removeItem('token')
  // });

  return (
    <>
      <NoteState>
        <Router>

          {/* <Navbar /> */}
          <Sidebar />
          <Alert alert={alert} />
          <div className="container ">
            <Switch>
            <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route> 
              <Route exact path="/addnote">
                <AddNote showAlert={showAlert}/>
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>

        </Router>
      </NoteState>

    </>
  );
}

export default App;
