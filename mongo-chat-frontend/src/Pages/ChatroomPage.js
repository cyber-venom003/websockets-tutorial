import React from 'react';
import { withRouter } from 'react-router';

const ChatroomPage = ({match, socket}) => {
    const chatRoomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();
    const [userId, setUserId] = React.useState("");

    const sendMessage = () => {
        if (socket){
            console.log(chatRoomId);
            socket.emit("chatRoomMessage", {
                chatRoomId,
                message: messageRef.current.value,    
            });
        }
    }

    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
        if(socket){
            socket.on("newMessage", ({message}) => {
                setMessages([...messages, message]);
                console.log(message);    
            });
        }
         //eslint-disable-next-line
    }, [messages]);
    
    React.useEffect(() => {
        if(socket){
            socket.emit("joinRoom", {
                chatRoomId,
            });
        }

        return () => {
            //Component Unmount
            if (socket){
                socket.emit("leaveRoom", {
                    chatRoomId,
                });
            }
        }
        //eslint-disable-next-line
    }, []);

    return <div className="chatroomPage">
        <div className="chatroomSection">
            <div className="cardHeader">
                Chatroom Name
            </div>
            <div className="chatroomContent">
                    {messages.map((message, i) => (
                        <div key={i} className="message">
                            <span className="ownMessage">{message.name}</span>
                            {message.message}
                        </div>
                    ))};
            </div>
            <div className="chatroomActions">
                <div>
                    <input type="text" name="message" placeholder="Type your message" ref={messageRef}></input>
                </div>
                <div>
                    <button className="join" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    </div>;
}

export default withRouter(ChatroomPage);