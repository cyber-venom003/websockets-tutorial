import React from 'react';

const DashboardPage = () => {
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