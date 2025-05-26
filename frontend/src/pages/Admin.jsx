import {useLoginContext} from "../contexts/LoginContext.jsx";
import '../css/admin/admin.css'

function Admin() {
    const {isLoggedIn, role} = useLoginContext();
    if (!isLoggedIn) {
        return (
            <div className="admin-page-container">
                <p className="admin-not-logged-in">You are not logged in</p>
            </div>
        )
    }
    if (role !== "admin") {
        return (
            <div className="admin-page-container">
                <p className="admin-not-logged-in">You are not an admin</p>
            </div>
        )
    }

    return (
        <div>

        </div>
    );
}

export default Admin;