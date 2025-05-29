import "../../css/booking/ContactDetails.css";
import {useEffect, useState} from "react";
import {putGuest} from "../../services/api.js";
import {useLoginContext} from "../../contexts/LoginContext.jsx";

function ChangeContactDetails({guestData}) {

    const {userAccountId} = useLoginContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (!guestData) return;
        setName(guestData.name);
        setEmail(guestData.email);
        setPhone(guestData.phone);
    }, [guestData]);

    function startChange() {
        document.querySelectorAll(".user-contact-details-form-input").forEach(input => input.removeAttribute("disabled"));
        document.querySelectorAll(".user-contact-details-form-button")[0].setAttribute("hidden", "");
        document.querySelectorAll(".user-contact-details-form-button")[1].removeAttribute("hidden");
    }

    async function confirmChange() {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /\b(?:\+?(\d{1,3})[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{4}\b/;

        if (name === '' || email === '' || phone === '') {
            alert("Please fill in all fields!");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email!");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid phone number!");
            return;
        }

        const newGuestData = {
            id: guestData.id,
            name: name,
            email: email,
            phone: phone,
            accountId: userAccountId
        };

        await putGuest(newGuestData).then().catch();

        alert("Contact details changed successfully!");
        window.location.reload();
    }

    return (
        <div className="user-contact-details-container">
            <h1>Contact Details</h1>
            <div className="user-contact-details-form">
                <label className="user-contact-details-form-label">Name: </label>
                <input disabled className="user-contact-details-form-input" value={name} type="text"
                       onChange={(e) => setName(e.target.value)}/>
                <label className="user-contact-details-form-label">Email: </label>
                <input disabled className="user-contact-details-form-input" value={email} type="email"
                       onChange={(e) => setEmail(e.target.value)}/>
                <label className="user-contact-details-form-label">Phone: </label>
                <input disabled className="user-contact-details-form-input" value={phone} type="tel"
                       onChange={(e) => setPhone(e.target.value)}/>
                <button className="user-contact-details-form-button" onClick={startChange}>Change
                </button>
                <button hidden className="user-contact-details-form-button" onClick={confirmChange}>Confirm
                </button>
            </div>
        </div>
    );
}

export default ChangeContactDetails;