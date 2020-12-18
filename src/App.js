import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './containers/Homepage';
import Dashboard from './containers/Dashboard';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import './App.css';
import fire from './fire';

const App = () => {
  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [emailErr,setEmailErr] = useState("");
  const [passErr,setPassErr] = useState("");
  const [hasAccount,setHasAccount] = useState(false);
  const [auth,setAuth] = useState(false)

  const cleanInput = () => {
    setEmail("")
    setPass("")
  }

  const cleanErr = () => {
    setEmailErr("")
    setPassErr("")
  }

  const handleLogin = (email, password) => {
    cleanErr()
    fire.auth().signInWithEmailAndPassword(email, password).catch(err => {
        switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
                console.log(err.message);
                setEmailErr(err.message)
                break;
            case "auth/wrong-password":
                console.log(err.message);
                setPassErr(err.message)
                break;

        }
    });
  }

  const handleSignUp = (email, password) => {
      cleanErr()
      fire.auth().createUserWithEmailAndPassword(email, password).catch(err => {
          switch(err.code){
              case "auth/email-already-in-user":
              case "auth/invalid-email":
                  console.log(err.message);
                  setEmailErr(err.message)
                  break;
              case "auth/weak-password":
                  console.log(err.message);
                  setPassErr(err.message)
                  break;

          }
      });
  };

  const handleLogout = () => {
      fire.auth().signOut()
      setAuth(false)
  };

  const authListener =() => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        cleanInput()
        //fetch('http://localhost:9000/users/login?email=' + user.email, {mode: 'no-cors'})
        fetch('https://budget-api-4166.herokuapp.com/users/login?email=' + user.email, {mode: 'no-cors'})
            .then(res => res.text())
            .then(res => {
              console.log(res)
              setEmail(user.email)
              setUser(user)
              setAuth(true)
            });
      } else {
          setUser("")
          console.log("no user");
      }
    })
  }

  useEffect(()=>{authListener();}, []);

  return (
    <div className="App">
      <Layout auth={auth} >
        <Switch>
            <Route path="/auth"
            render={(props) => (
                <Auth {...props} email={email} setEmail={setEmail} auth={auth} pass={pass} setPass={setPass} emailErr={emailErr} passErr={passErr}
                  handleLogin={handleLogin} handleSignUp={handleSignUp} hasAccount={hasAccount} setHasAccount={setHasAccount} />
              )} 
            />
            <Route path="/dashboard" render={(props) => (
                <Dashboard email={email} auth={auth}/>
              )} 
            />
            <Route path="/logout" render={(props) => (
                <Logout handleLogout={handleLogout} />
              )} 
            />
            <Route path="/" exact render={(props) => (
                <Homepage />
              )} 
            />
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
