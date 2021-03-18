import React from 'react';
import makeToast from '../Toaster';

const DashboardPage = (props) => {
    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        console.log(token);
        if (!token){
            props.history.push('/');
        } else {
            makeToast('success' , 'Welcome');
        }
        // eslint-disable-next-line
    } , [0]);
    return(
        <div className="card">
            <div className="cardHeader">
                Create Chatroom
            </div>
            <div className="cardBody">
                <div className ="inputGroup">
                    <label htmlFor="chatroomName">Name</label>
                    <input type="text" name="chatroomName" id="chatroomName" placeholder="E.g. Swag Gang"></input>
                </div>
                <button>Go to chatroom</button>
                <div className="chatrooms">
                    <div className="chatroom">
                        <div>Yaarana</div>
                        <div className="join">Join</div>
                    </div>
                </div>
            </div>
        </div>
        );
}

export default DashboardPage;