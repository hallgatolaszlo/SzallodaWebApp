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
        <div className="login-register-container">
            <div className="reg-form-inputs">

                <div className="reg-form-block-header">
                    <p>Username</p>
                    <input placeholder="New username..."></input>
                    <p>Password</p>
                    <input type="password" placeholder="Password..."></input>
                    <p>Confirm password</p>
                    <input type="password" placeholder="Confirm password..."></input>
                </div>

                <div className="reg-form-block-buttons">
                    <button>Sign up</button>
                    <label>OR</label>
                    <button>Log in</button>
                </div>

            </div>
        </div>
    );
}

export default RegForm;