import React from "react";
import { Router, Route, Link } from "react-router-dom";
// MDH@02FEB2020: All Chat specific pages prefix with Chat
import ChatHomePage from "./ChatHomePage";
import ChatTopBar from "./ChatTopBar";
import { createBrowserHistory as createHistory } from "history";
import "./App.css";
import ChatRoomPage from "./ChatRoomPage";
const history = createHistory();
function App() {
  return(<div className="App">
      <Router history={history}>
        <ChatTopBar />
        <Route path="/" exact component={ChatHomePage} />
        <Route path="/chatroom" exact render={()=><ChatRoomPage chatRoom={JSON.parse(window.sessionStorage.chatData).chatRoomName} chatRoomUser={JSON.parse(window.sessionStorage.chatData).handle}/>}/>
      </Router>
    </div>);
}
export default App;