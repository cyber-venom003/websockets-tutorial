import React from 'react';

const LoginPage = () => {
    return(
    <div className="card">
        <div className="cardHeader">
            Login
        </div>
        <div className="cardBody">
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

export default LoginPage;