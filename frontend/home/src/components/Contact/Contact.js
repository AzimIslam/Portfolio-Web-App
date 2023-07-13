import PropTypes from 'prop-types'
import React from 'react'

// CSS: frontend\src\components\Contact\Contact.css
import './Contact.css'

// Components
import ContactForm from './ContactForm/ContactForm'
import FadeInItem from '../FadeInItem/FadeInItem'

// Contact Component
export default function Contact ({ description }) {
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
  )
}

Contact.propTypes = {
  description: PropTypes.string.isRequired
}
