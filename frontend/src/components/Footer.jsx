import "../css/Footer.css";

function Footer() {
    return (
        <>
            <footer>
                <hr className="footer-hr"/>
                <h3 className="footer-text footer-text-1">Hotel Atlantis <span
                    className="line-icon">||</span> Premium Hotel</h3>
                <div className="footer-contact">
                    <h3 className="footer-text footer-text-2">
                        <a className="footer-links"
                           href="https://www.google.com/maps/place/31°15'15.5&quot;N+24°15'30.5&quot;W/@31.2543185,-24.2610555,962m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d31.2543139!4d-24.2584806?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D"
                           target="_blank" rel="noreferrer">
                            Address: 31°15′15.53″N, 24°15′30.53″W
                        </a>
                    </h3>
                    <h3 className="footer-text footer-text-2">Phone: +100 300 351 7614</h3>
                    <h3 className="footer-text footer-text-2">E-mail: info@atlantishotel.com</h3>
                </div>
            </footer>
        </>
    );
}


export default Footer;