  
  
  const connectToRoom = () => {
    socket.on("connect", data => {
      socket.emit("join", getChatData().chatRoomName);
    });
    socket.on("newMessage", data => {
      getMessages();
    });
    setInitialized(true);
  };
  
  const getMessages = async () => {
    const response = await getChatRoomMessages(getChatData().chatRoomName);
    setMessages(response.data);
    setInitialized(true);
  };
  
  const getRooms = async () => {
    const response = await getChatRooms();
    setRooms(response.data);
    setInitialized(true);
  };
  


  