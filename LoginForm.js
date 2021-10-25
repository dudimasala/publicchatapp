import {useState} from "react";
import axios from "axios"; 

const LoginForm = () => {
    const [username, setUsername] = useState(localStorage.getItem('username')?localStorage.getItem('username'):'');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [login, setLogin] = useState(true);

    const [usernamesi, setUsernamesi] = useState('');
    const [passwordsi, setPasswordsi] = useState('');
    const [confirmp, setConfirmp] = useState('');
    const [email, setEmail] = useState('');
    const [fn, setFn] = useState('');
    const [ln, setLn] = useState('');
    const [errorsi, setErrorsi] = useState('');
    const acceptedEmails = [
        //add accepted emails in here
    ]; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = {'Project-ID': 'Input your project id', 'User-Name': username, 'User-Secret': password};

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject})
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            setError('Oops, incorrect credentials.');
        }
        
    }

    const signUp = async (e) => {
        e.preventDefault();
        if(!(passwordsi === confirmp)) {
            setErrorsi('Passwords do not match');
            setPasswordsi('');
            setConfirmp('');
            return
        }
        if(!(acceptedEmails).includes(email)) {
            setErrorsi('You are not from MK2');
            return
        }

        let getReq = {
            method: 'get',
            url: 'https://api.chatengine.io/users/',
            headers: {
                'PRIVATE-KEY': '{{...}}'
            }
        }

        axios(getReq)
        .then(function (response) {
            let givenUsernames = []
            let givenEmails = []
            let users = Object.keys(response.data);
            for(let i=0; i<users.length; i++) {
                givenUsernames.push(response.data[users[i]].username);
                givenEmails.push(response.data[users[i]].email);
            }
            if(givenEmails.includes(email)) {
                setErrorsi('That email is taken');
                return
            }
            if(givenUsernames.includes(usernamesi)) {
                setErrorsi('That username is taken');
                return
            }
            let data = {
                "username": usernamesi,
                "secret": passwordsi,
                "email": email,
                "first_name": fn,
                "last_name": ln,
            }
            
            let config = {
                method: 'post',
                url: 'https://api.chatengine.io/users/',
                headers: {
                    'PRIVATE-KEY': '{{...}}'
                },
                data : data
            };
    
            axios(config)
            .then(function (response) {
                setError("You're all set, please log in!");
                setLogin(true);
                setUsername(usernamesi);
                setPassword('');
                setUsernamesi('');
                setPasswordsi('');
                setConfirmp('');
                setEmail('');
                setFn('');
                setLn('');
            })
            .catch(function (error) {
                setErrorsi("Error, please try again later");
            });
        })
        .catch(function (error) {
            setErrorsi("Error, please try again later");
        });
    }

    const changeLogin = () => {
        setLogin(!login);
    }

    if(login) {
        return (
            <div className="wrapper">
                <div className="form">
                    <h1 className="title">MK2 Chat Application</h1>
                    <button type="button" className="button" style={{width: "190px", backgroundColor: '#cabcdc', marginBottom: "5vh"}}>
                        <span>Log in</span>
                    </button>
                    <button type="button" onClick={changeLogin} className="button" style={{width: "190px"}}>
                        <span>Sign up</span>
                    </button>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required/>
                        <div align="center">
                            <button type="submit" className="button">
                                <span>Start Chatting</span>
                            </button>
                        </div>
                        <h2 className="error" style={{textAlign:"center"}}>{error}</h2>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className="wrapper">
                <div className="form">
                    <h1 className="title">MK2 Chat Application</h1>
                    <button type="button" onClick = {changeLogin} className="button" style={{width: "190px", marginBottom: "5vh"}}>
                        <span>Log in</span>
                    </button>
                    <button type="button" className="button" style={{width: "190px", backgroundColor: '#cabcdc'}}>
                        <span>Sign up</span>
                    </button>
                    <form onSubmit={signUp}>
                        <input type="text" value={usernamesi} onChange={(e) => setUsernamesi(e.target.value)} className="input" placeholder="Username" required/>
                        <input type="password" value={passwordsi} onChange={(e) => setPasswordsi(e.target.value)} className="input" placeholder="Password" required/>
                        <input type="password" value={confirmp} onChange={(e) => setConfirmp(e.target.value)} className="input" placeholder="Confirm Password" required/>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="GSIS School Email" required/>
                        <input type="text" value={fn} onChange={(e) => setFn(e.target.value)} className="input" placeholder="First Name" required/>
                        <input type="text" value={ln} onChange={(e) => setLn(e.target.value)} className="input" placeholder="Last Name" required/>
                        <div align="center">
                            <button type="submit" className="button">
                                <span>Sign Up</span>
                            </button>
                        </div>
                        <h2 className="error" style={{textAlign: "center"}}>{errorsi}</h2>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm
