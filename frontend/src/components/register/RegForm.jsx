import '../../css/register/RegForm.css';
import {getFromAPI, register} from "../../services/api.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function RegForm() {
    const [accounts, setAccounts] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchAccounts() {
            return await getFromAPI("accounts");
        }

        fetchAccounts().then(data => setAccounts(data));
    }, []);

    function tryAddAccount() {
        const usernameExists = accounts.find((account) => account.username === username);

        if (usernameExists) {
            alert("Username already taken!");
            setUsername('');
        } else {
            if (password !== cpassword) {
                alert("Passwords do not match!");
            } else {
                register(username, password)
                    .then((data) => {
                        console.log(data);
                        navigate("/login", {replace: true});
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        }
    }

    function returnToLoginPage() {
        navigate("/login", {replace: true});
    }


    return (
        <div className="form-block">

            <div className="input-field">

                <div className="reg-form-block-header">
                    <p>Username</p>
                    <input placeholder="New username..."
                           className="input-username-reg"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}></input>
                    <p>Password</p>
                    <input type="password"
                           placeholder="Password..."
                           className="input-password-reg"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}><
                    /input>
                    <p>Confirm password</p>
                    <input type="password"
                           placeholder="Confirm password..."
                           className="input-password-confirm"
                           value={cpassword}
                           onChange={(e) => setCpassword(e.target.value)}/>
                </div>

                <div className="reg-form-block-buttons">
                    <button className="register-button" onClick={tryAddAccount}>Sign up</button>
                    <button className="login-button-r" onClick={returnToLoginPage}>Log in</button>
                </div>

            </div>

            <div className="logi-button-field-r">


            </div>
        </div>
    );
}

export default RegForm;