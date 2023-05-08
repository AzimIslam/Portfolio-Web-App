// CSS : /frontend/src/components/Footer/Footer.css
import './Footer.css'

// Icons
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai'

// Footer component
export default function Footer({name, linkedinURL, email, github}) {

    return (
        <footer>
            <div className="footer-container">
                <p className="footer-text">© {(new Date()).getFullYear()} {name}</p>
                <div className="footer-links">
                    <a href={github} target="_blank" rel="noopener noreferrer">
                        <AiFillGithub onClick={github} className="footer-icon" />
                    </a>
                    <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
                        <AiFillLinkedin className="footer-icon" />
                    </a>
                    <a href={`mailto:${email}`}>
                        <AiFillMail className="footer-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
