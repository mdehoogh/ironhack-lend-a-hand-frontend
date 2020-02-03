import React,{Component} from "react";

import { useEffect } from "react";

import { animateScroll } from "react-scroll";

// import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import * as yup from "yup";
import io from "socket.io-client";
import "./ChatRoomPage.css";

import ChatItem from './components/ChatItem';

import { getChatRoomMessages, getChatRooms } from "./ChatRequests";

const SOCKET_IO_URL = "http://localhost:5000"; // MDH@02FEB2020: running our Chat server on 5000 not 3000

const socket = io(SOCKET_IO_URL);

// access to the chat definition (the 'handle' and the chat room)
// const getChatData = () => {
//   return JSON.parse(localStorage.getItem("chatData"));
// };

// dealing with asynchronic stuff (e.g. when receiving a newMessage telling us that a new message was posted!)
// BUT ChatRoomPage was converted to a Component 
// const connectToRoom = () => {
//     socket.on("connect", data => {
//     socket.emit("join", getChatData().chatRoomName);
//     });
//     socket.on("newMessage", data => {
//     getMessages();
//     });
//     setInitialized(true);
// };
// const getMessages = async () => {
//     const response = await getChatRoomMessages(getChatData().chatRoomName);
//     setMessages(response.data);
//     setInitialized(true);
// };
// const getRooms = async () => {
//     const response = await getChatRooms();
//     setRooms(response.data);
//     setInitialized(true);
// };
// useEffect(() => {
//     if (!initialized) {
//     getMessages();
//     connectToRoom();
//     getRooms();
//     }
// });

class ChatRoomPage extends Component {

    // const [initialized, setInitialized] = useState(false);
    // const [messages, setMessages] = useState([]);
    // const [rooms, setRooms] = useState([]);

    updateMessages(){
        console.log("Updating chat room messages!");
        // update the messages so far posted in this chat room
        getChatRoomMessages(this.state.chatRoom)
            .then((response)=>{
                let messages=response.data;
                this.setState({
                    messages:(messages||[])
                });
            })
            .catch((err)=>{
                alert("ERROR: Failed to obtain the messages posted so far in chat room '"+this.state.chatRoom+"'.");
            });
    }
    onChatRoomConnect(){
        socket.emit("join",this.state.chatRoom,(ack)=>{this.updateMessages();});
    }

    constructor(props){
        super(props);
        // console.log("Chat room props",this.props);
        // instead of using hooks or the global localStorage.chatData we assume to receive chatroom and 'handle'
        this.updateMessages=this.updateMessages.bind(this);
        this.onChatRoomConnect=this.onChatRoomConnect.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            chatRoom:this.props.chatRoom,
            chatRoomUser:this.props.chatRoomUser,
            messages:[],
            message:""
        };
        // on every connect, we join our registered chat room
        // every time we receice a new message the message might've changed!!!!
        socket.on("connect",data=>{this.onChatRoomConnect();});
        socket.on("newMessage",data=>{this.updateMessages();});
        if(!socket.connected)socket.connect(); // force a connect if not currently connected!!!!
    }

    scrollToBottom(){
        console.log("Scroll to bottom!");
        animateScroll.scrollToBottom({containerId: "chat-box"});
    }
    
    componentDidMount(){
        // if already connected, join the current chatroom and once ack'ed update the messages
        if(socket.connected)this.updateMessages(); // update here and now
    }

    componentDidUpdate(){this.scrollToBottom();}

    handleChange(evt){
        // update the message to send from the target
        this.setState({
            message:evt.target.value,
        });
    }
    handleSubmit(evt){
        let messageToSend=this.state.message.trim();
        if(messageToSend.length===0){alert("No message to send!");return;}
        const data={};
        data.chatRoomName=this.state.chatRoom; // replacing: getChatData().chatRoomName;
        data.author=this.state.chatRoomUser; // replacing: getChatData().handle;
        data.message=messageToSend;
        socket.emit("message",data);
        // clear the message!!!!
        // this.setState({
        //     message:""
        // });
    };

    render(){
        console.log("State",this.state);
        // let redBorderStyle={'border':'1px solid red'};
        // let blueBorderStyle={'border':'1px solid blue'};
        return(<div className="chat-room-page">
            {/* <h1>Chat Room: {getChatData().chatRoomName}. Chat Handle:{" "}{getChatData().handle}</h1> */}
            <h1>Chat Room: {this.state.chatroom} Chat Handle:{" "}{this.state.chatroomuser}</h1>
            <div id='chat-box' className="chat-box">
                    <ul class='chat'>
                        {this.state.messages
                            ?this.state.messages.map((m, i) =>
                                <ChatItem author={m.author} bymyself={m.author===this.state.chatRoomUser} message={m.message} hms={m.createdAt.substr(-13,8)}/>)
                            :<></>
                        }
                    </ul>
                {/* {this.state.messages
                    ?this.state.messages.map((m, i) => {
                        return(<div className="col-12" key={i}>
                                    {m.author===this.state.chatRoomUser
                                        ?
                                        <div className='row' style={redBorderStyle}>
                                            <div className='col-2'>&nbsp;</div>
                                            <div className="col-9">{m.message} {m.createdAt.substr(-13,8)}</div>
                                            </div>
                                        :
                                        <div className='row' style={blueBorderStyle}>
                                            <div className='col-9'>{m.author}: {m.message} {m.createdAt.substr(-13,8)}</div>
                                        </div> 
                                    }
                            </div>);
                        })
                    :<></>
                } */}
            </div>
            <Form noValidate onSubmit={e =>{this.handleSubmit();e.preventDefault();}}>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="handle">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            type="text"
                            name="message"
                            placeholder="Message"
                            value={this.state.message}
                            onChange={this.handleChange}
                            // isInvalid={touched.message && errors.message}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                            {errors.message}
                        </Form.Control.Feedback> */}
                    </Form.Group>
                </Form.Row>
                {/* <Button type="submit" style={{ marginRight: "10px" }}> */}
                <Button onClick={this.handleSubmit}>
                    Send
                </Button>
            </Form>
        </div>);
    }
}

export default ChatRoomPage;