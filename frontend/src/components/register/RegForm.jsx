import '../../css/login/Form.css';
import {getFromAPI, postAccounts} from "../../services/api.js";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";


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
                postAccounts(username, password)
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

    return (
        <div className="form-block">
            <div className="input-area">
                <div className="input-field">
                    <p>Username</p>
                    <input placeholder="New username..."
                           className="input-username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="input-field">
                    <p>Password</p>
                    <input type="password"
                           placeholder="Password..."
                           className="input-password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}><
                    /input>
                </div>
                <div className="input-field">
                    <p>Confirm password</p>
                    <input type="password"
                           placeholder="Confirm password..."
                           className="input-password"
                           value={cpassword}
                           onChange={(e) => setCpassword(e.target.value)}/>
                </div>
                <button className="login-button" onClick={tryAddAccount}>Sign up</button>
            </div>
            <div className="text-field">
                <p>Already have an account?</p>
                <Link to="/login" className="sign-up-link"> Log in</Link>
            </div>

        </div>
    );
}

export default RegForm;