import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="new_footer_area">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row">
                        <div className="part-1">
                            <h3>Get in Touch</h3>
                            <p>Don’t miss any updates of our new templates and extensions.!</p>
                            <form action="#">
                                <input name="EMAIL" placeholder="Email" className='mail' />
                                <button className="but-1" type="submit">Subscribe</button>
                                <p className="mchimp-errmessage" style={{ display: 'none' }}></p>
                                <p className="mchimp-sucmessage" style={{ display: 'none' }}></p>
                            </form>
                        </div>
                        <div className="part-2" data-wow-delay="0.4s">
                            <h3>Know More</h3>
                            <div className="links">
                                <a href="#">Company</a>
                                <a href="#">Desktop</a>
                                <a href="#">Projects</a>
                            </div>
                        </div>
                        <div className="part-3">
                            <h3>Help</h3>
                            <div className="links">
                                <a href="#" className='faq'>FAQ</a>
                                <a href="#">Terms &amp; conditions</a>
                                <a href="#">Reporting</a>
                                <a href="#">Documentation</a>
                                <a href="#">Support Policy</a>
                                <a href="#">Privacy</a>
                            </div>
                        </div>
                        <div className="part-4">
                            <h3>Team Solutions</h3>
                            <div className="f_social_icon">
                                <a href="#" className="fab fa-facebook"> f</a>
                                <a href="#" className="fab fa-twitter"> T</a>
                                <a href="#" className="fab fa-linkedin"> L </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bg">
                    <div className="footer_bg_one"></div>
                    <div className="footer_bg_two"></div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="copy">
                        <div className="copyRight">
                            <p>Made with <i className="icon_heart"></i> in <a href="#" target="_blank">Intellect Coin</a></p>
                        </div>
                        <div className="rights">
                            <p className="mb-0 f_400">© Intellect Coin Inc. 2024 All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
