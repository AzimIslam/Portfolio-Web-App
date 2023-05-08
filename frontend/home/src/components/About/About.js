// CSS: frontend\src\components\About\About.css
import './About.css';

// Library for input sanitization
import DOMPurify from 'dompurify';

// About Component
export default function About({description, profileImg}) {
    const allowedTags = ['strong', 'em', 'span', 'b'];
    const allowedAttributes = ['style', 'class'];
    
    // Sanitizes the input string to prevent XSS attacks
    const sanitizedString = DOMPurify.sanitize(description, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes,
    });
      
    return (
        <div id="about">
            <h1 id="aboutTitle">About</h1>
            <img id="profilePic" src={`http://localhost:8000/${profileImg}`} alt='Profile' />
            <p id="aboutDescription" dangerouslySetInnerHTML={{ __html: sanitizedString }}></p>
        </div>
    );
}
