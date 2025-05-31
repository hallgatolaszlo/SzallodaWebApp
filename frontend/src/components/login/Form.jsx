import {useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";
import '../../css/login/Form.css';
import {Link} from 'react-router-dom';
import {useLoginContext} from "../../contexts/LoginContext.jsx";

function Form() {
    const {login} = useLoginContext();
    const [accounts, setAccounts] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


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
            }
        });

    }


    return (


        <div className="form-block">

            <div className="input-area">
                <div className="input-field">
                    <p>Username</p>
                    <input className="input-username"
                           value={username}
                           placeholder="Enter your username"
                           onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <p>Password</p>
                    <input className="input-password"
                           value={password}
                           placeholder="Enter your password"
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   checkAccounts();
                               }
                           }}
                    />
                </div>
                <button className="login-button" onClick={checkAccounts}>Log in</button>
            </div>

            <div className="text-field">
                <p>Don't have an account?</p>
                <Link to="/register" className="sign-up-link"> Sign up</Link>
            </div>


        </div>
    );
}

export default Form;