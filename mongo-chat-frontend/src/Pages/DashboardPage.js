import React from 'react';
import makeToast from '../Toaster';
import axios from 'axios';
import { Link } from "react-router-dom";

const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const getChatrooms = async () => {
        try {
            const response = await axios.get('http://localhost:8000/chatroom' , {
            headers: {
                    Authorization: "Bearer " + localStorage.getItem('CC_Token'),
                },
            });
            setChatrooms(response.data);
        } catch (err) {
            setTimeout(getChatrooms, 3000);
        }
    };
    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        console.log(token);
        if (!token){
            props.history.push('/');
        } else {
            makeToast('success' , 'Welcome');
            getChatrooms();
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
                    {chatrooms.map((chatroom) => (
                        <div key={chatroom._id} className="chatroom">
                            <div>{chatroom.name}</div>
                            <Link to={"/chatroom/" + chatroom._id}><div className="join">Join</div></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        );
}

export default DashboardPage;