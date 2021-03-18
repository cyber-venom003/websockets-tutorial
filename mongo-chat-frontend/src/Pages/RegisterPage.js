import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';

const RegisterPage = (props) => {
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            let response = await axios.post('http://localhost:8000/user/register' , {
                name,
                email, 
                password
            });
            console.log(response.data);
            makeToast('success' , response.data.message);
            props.history.push("/login");
        } catch (error) {
            makeToast('error' , error);
        }
    }

    return(
        <div className="card">
            <div className="cardHeader">
                Register
            </div>
            <div className="cardBody">
                <div className ="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="text" id="text" placeholder="E.g. Linda Stark" ref = {nameRef}></input>
                </div>
                <div className ="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="E.g. linda264@gmail.com" ref = {emailRef}></input>
                </div>
                <div className ="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" ref = {passwordRef}></input>
                </div>
                <button onClick={registerUser}>Register</button>
            </div>
        </div>
        );
}

export default RegisterPage;