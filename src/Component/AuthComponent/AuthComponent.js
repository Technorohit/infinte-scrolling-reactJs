import React, { useState } from 'react'
import './AuthComponent.css'
import {setUserSession} from '../../Utility/util'
import { useNavigate } from 'react-router-dom';

export default function AuthComponent(props) {
    let navigate = useNavigate();
  
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorState, setErrorState] = useState(false);
   
    const loginHandler = () => {
        if (userName === "foo" && password === "bar") {
            console.log("login Success")
            setErrorState(false)
           
            setUserSession({
                user:'foo'
            })
            navigate('/dashboard');
        }
        else {
            console.log("wrong password")
            setErrorState(true)
        }
    }

console.log("value: ",userName)
    return (
        <div className="login-container">
            <div className="welcome-text">Welcome Back !!!</div>
            <div className="loginForm">
                <input type="text" onChange={e => setUserName(e.target.value)} placeholder="USERNAME" />
                <br />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" />
                <br />
                <button type="submit" data-testid="login-cta" onClick={loginHandler} >Login</button>
            </div>
            {errorState ? 'Oops wrong password Entered, pls try again' : ''}
        </div>
    )
}
