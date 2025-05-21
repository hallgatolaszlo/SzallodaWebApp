import "../css/Footer.css";

function Footer() {
    return (
        <>
            <footer>
                <hr className="footer-hr"/>
                <h3 className="footer-text footer-text-1">Hotel Atlantis <span
                    className="line-icon">||</span> Premium Hotel</h3>
                <div className="footer-contact">
                    <h3 className="footer-text footer-text-2">Address: 31°15′15.53″N, 24°15′30.53″W</h3>
                    <h3 className="footer-text footer-text-2">Phone: +100 300 351 7614</h3>
                    <h3 className="footer-text footer-text-2">E-mail: info@atlantishotel.com</h3>
                </div>
            </footer>
        </>
    );
}


export default Footer;