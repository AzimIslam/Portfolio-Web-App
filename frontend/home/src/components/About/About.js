// CSS: frontend\src\components\About\About.css
import './About.css'

import PropTypes from 'prop-types'

// Library for input sanitization
import DOMPurify from 'dompurify'

// Dependencies
import FadeInItem from '../FadeInItem/FadeInItem'
import React from 'react'

// About Component
export default function About ({ description, profileImg }) {
  const allowedTags = ['strong', 'em', 'span', 'b']
  const allowedAttributes = ['style', 'class']

  // Sanitizes the input string to prevent XSS attacks
  const sanitizedString = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes
  })

  return (
        <div id="about">
            <>
            <FadeInItem timeout={300}>
                <h1 id="aboutTitle">About</h1>
            </FadeInItem>

            <FadeInItem timeout={600}>
                <img id="profilePic" src={`http://localhost:8000/${profileImg}`} alt='Profile' />
            </FadeInItem>

            <FadeInItem timeout={900}>
                <p id="aboutDescription" dangerouslySetInnerHTML={{ __html: sanitizedString }}></p>
            </FadeInItem>
            </>
        </div>
  )
}

About.propTypes = {
  description: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired
}
