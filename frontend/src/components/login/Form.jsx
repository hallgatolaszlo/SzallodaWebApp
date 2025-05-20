import '../../css/Form.css';
import {Link} from 'react-router-dom';

function Form() {
    return (
        <div className="form-block">
            <div className="input-name-field">
                <p>Username</p>
                <input className="input-username" placeholder="Type your username here..."/>
            </div>

            <br/>

            <div className="input-password-field">
                <p>Password</p>
                <input className="input-password" placeholder="Type your password here..."/>
            </div>

            <p>Doesn't have an account? </p>
            <Link to="/register" className="sign-up-link">Sign up here!</Link>
        </div>
    );
}

export default Form;