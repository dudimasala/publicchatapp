import { ChatEngine } from "react-chat-engine";
import LoginForm from "./LoginForm";
import axios from "axios";
import './App.css';

const App = () => {
    if(!localStorage.getItem('password')) return <LoginForm />

    const signOut = () => {
        localStorage.setItem('password', "");
        window.location.reload();
    }

    const tryLoginWithAuth = async () => {
        const authObject = {'Project-ID': '...', 'User-Name': localStorage.getItem('username'), 'User-Secret': localStorage.getItem('password')};
        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject})
        }  catch (error) {
            localStorage.setItem('password', "");
            window.location.reload();
        }
    }
    tryLoginWithAuth();
    return (
        <div>
        <div><img src="./logo192.png" alt="logo" style={{marginLeft: "10vw"}} width="40vh" height="40vh"/></div>
        <div style={{position:"absolute", top:"1vh", marginLeft: "47vw"}}>MK2 Official Chat</div>
        <div style={{marginLeft: "85vw", position:"absolute", top: "0.6vh"}}>
        <button type="button" onClick={signOut} className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-log-out"></span> Log out
        </button>
        </div>
        <ChatEngine 
            height="94.5vh"
            projectID="..."
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
        </div>
    )
}

export default App;
