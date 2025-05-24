import {useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";
import '../../css/login/Form.css';
import {Link, useNavigate} from 'react-router-dom';
import {useLoginContext} from "../../contexts/LoginContext.jsx";

function Form() {
    const {login} = useLoginContext();
    const [accounts, setAccounts] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchAccounts() {
            return await getFromAPI("accounts");
        }


        fetchAccounts().then(data => setAccounts(data));
    }, []);


    function checkAccounts() {


        accounts.forEach((account) => {
            if (account.username === username && account.password === password) {
                login({
                    "username": account.username,
                    "accountId": account.id,
                    "role": account.role,
                });
                navigate("/", {replace: true});
            }
        });

    }


    return (


        <div className="form-block">

            <div className="input-field">
                <p>Username</p>
                <input className="input-username"
                       value={username}
                       placeholder="Type your username here..."
                       onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <p>Password</p>
                <input className="input-password"
                       value={password}
                       placeholder="Type your password here..."
                       type="password"
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={checkAccounts}>Log in</button>
            </div>

            <div className="ext-field">
                <p>Don't have an account yet?</p>
                <Link to="/register" className="sign-up-link"> Sign up here!</Link>
            </div>


        </div>
    );
}

export default Form;