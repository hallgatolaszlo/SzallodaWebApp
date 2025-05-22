import '../../css/register/RegForm.css'
import {getFromAPI, postAccounts} from "../../services/api.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function RegForm() {
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

    return (
        <div className="form-block">

            <div className="input-field">

                <div className="reg-form-block-header">
                    <p>Username</p>
                    <input placeholder="New username..." className="input-username"></input>
                    <p>Password</p>
                    <input type="password" placeholder="Password..." className="input-password"></input>
                    <p>Confirm password</p>
                    <input type="password" placeholder="Confirm password..." className="input-password-confirm"></input>
                </div>

                <div className="reg-form-block-buttons">
                    <button className="register-button">Sign up</button>
                    <label>OR</label>
                    <button className="login-button">Log in</button>
                </div>

            </div>
        </div>
    )
}

export default RegForm;