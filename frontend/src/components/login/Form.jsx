import {useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";
import '../../css/login/Form.css';
import {Link} from 'react-router-dom';

function Form() {
    const [accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchAccounts() {
            return await getFromAPI("accounts");
        }


        fetchAccounts().then(data => setAccounts(data)).then(() => setLoading(false));
    }, []);


    function checkAccounts() {

        console.log(accounts);
        if (loading) {
            setLoading(true);
        }

    }


    return (


        <div className="form-block">

            <div className="input-field">
                <p>Username</p>
                <input className="input-username" placeholder="Type your username here..."/>
                <br/>
                <p>Password</p>
                <input className="input-password" type="password" placeholder="Type your password here..."/>
                <button className="login-button" onClick={checkAccounts}> Log in</button>
            </div>

            <div className="ext-field">
                <p>Don't have an account yet?</p>
                <Link to="/register" className="sign-up-link"> Sign up here!</Link>
            </div>


        </div>
    );
}

export default Form;