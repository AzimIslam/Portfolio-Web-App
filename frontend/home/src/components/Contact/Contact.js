// CSS: frontend\src\components\Contact\Contact.css
import FadeInItem from '../FadeInItem/FadeInItem';
import './Contact.css';

// Components
import ContactForm from './ContactForm/ContactForm';

// Contact Component
export default function Contact({description}) {

    return (
        <div id="contact">
            <FadeInItem timeout={300}>
                <h1 id="contactTitle">Get In Touch</h1>
            </FadeInItem>
            <FadeInItem timeout={600}>
                <p id="contactDescription">{description}</p>
            </FadeInItem>
            <ContactForm />
        </div>
    );
}
