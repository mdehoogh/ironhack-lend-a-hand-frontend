const APIURL = "http://localhost:5000"; // MDH@02FEB2020: again 5000 
const axios = require("axios");

export const getChatRooms = () => axios.get(`${APIURL}/chatroom/chatrooms`);

export const getChatRoomMessages = chatRoomName => axios.get(`${APIURL}/chatroom/chatroom/messages/${chatRoomName}`);

export const joinRoom = room => axios.post(`${APIURL}/chatroom/chatroom`, { room });