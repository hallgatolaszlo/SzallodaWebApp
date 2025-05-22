import '../../css/login/Form.css';
import {Link} from 'react-router-dom';

function Form() {
    return (


        <div className="form-block">

            <div className="input-field">
                <p>Username</p>
                <input className="input-username" placeholder="Type your username here..."/>
                <br/>
                <p>Password</p>
                <input className="input-password" type="password" placeholder="Type your password here..."/>
                <button className="login-button"> Log in</button>
            </div>

            <div className="ext-field">
                <p>Don't have an account yet?</p>
                <Link to="/register" className="sign-up-link"> Sign up here!</Link>
            </div>


        </div>
    );
}

export default Form;