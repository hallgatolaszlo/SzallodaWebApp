import '../../css/register/RegForm.css'

function RegForm() {
    return (
        <div className="login-register-container">
            <div className="reg-form-inputs">

                <div className="reg-form-block-header">
                    <p>Username</p>
                    <input placeholder="New username..."></input>
                    <p>E-mail</p>
                    <input type="email" placeholder="Email..."></input>
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