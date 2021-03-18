import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';

const LoginPage = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            let response = await axios.post('http://localhost:8000/user/login' , {
                email, 
                password
            });
            console.log(response.data);
            makeToast('success' , response.data.message);
            localStorage.setItem("CC_Token" , `${response.data.token}`);
            props.history.push("/dashboard");
        } catch (error) {
            makeToast('error' , error);
        }
    }

    return(
    <div className="card">
        <div className="cardHeader">
            Login
        </div>
        <div className="cardBody">
            <div className ="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="E.g. linda264@gmail.com" ref={emailRef}></input>
            </div>
            <div className ="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" ref={passwordRef}></input>
            </div>
            <button onClick={loginUser}>Login</button>
        </div>
    </div>
    );
}

export default LoginPage;