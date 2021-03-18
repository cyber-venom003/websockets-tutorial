import React from 'react';

const RegisterPage = () => {
    return(
        <div className="card">
            <div className="cardHeader">
                Register
            </div>
            <div className="cardBody">
                <div className ="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="text" id="text" placeholder="E.g. Linda Stark"></input>
                </div>
                <div className ="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="E.g. linda264@gmail.com"></input>
                </div>
                <div className ="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password"></input>
                </div>
                <button>Login</button>
            </div>
        </div>
        );
}

export default RegisterPage;