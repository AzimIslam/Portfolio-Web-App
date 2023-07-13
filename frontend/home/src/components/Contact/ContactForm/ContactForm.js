// CSS: frontend\src\components\Contact\ContactForm\ContactForm.css
import './ContactForm.css';

// Depenedencies
import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import FadeInItem from '../../FadeInItem/FadeInItem';


// About Component
export default function ContactForm() {

    // Form values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [notRobot, setNotRobot] = useState(false);
    const recaptchaRef = useRef(null);

    const handleCaptcha = () => {
        setNotRobot(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mySwal = withReactContent(Swal);
        

        if(notRobot) {
            const formData = {
                name: name,
                email: email,
                message: message
            }

            // Reset reCAPTCHA and form
            e.target.reset();
            recaptchaRef.current.reset();

            mySwal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for your message, I will get back to you as soon as possible.',
            });
        }  else {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please complete the reCAPTCHA',
            });

        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <FadeInItem timeout={900}>
                <div id="contactFormName">
                    <input type="text" id="contactname" name="name" placeholder="Full Name" required onChange={(e) => setName(e.target.value)}/>
                </div>
            </FadeInItem>

            <FadeInItem timeout={1200}>
            <div id="contactFormEmail">
                <input type="email" id="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            </FadeInItem>
            
            <FadeInItem timeout={1500}>
            <div id="contactFormMessage">
                <textarea id="message" name="message" placeholder="Message" required onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            </FadeInItem>

            <FadeInItem timeout={1800}>
            <div id="contactFormCaptcha">
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptcha} ref={recaptchaRef}/>
            </div>
            </FadeInItem>

            <div id="contactFormSubmit">
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
}
