import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './FadeInItem.css'

const FadeInItem = ({ children, timeout = 500 }) => {
  const itemRef = useRef(null)
  const [hasFadedIn, setHasFadedIn] = useState(false)

  useEffect(() => {
    const item = itemRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasFadedIn) {
          item.classList.add('fade-in')
          setHasFadedIn(true)
        }
      })
    })

    observer.observe(item)

    return () => {
      observer.unobserve(item)
    }
  }, [hasFadedIn])

  return (
    <div className={`fade-in-item ${hasFadedIn ? 'fade-in' : ''}`} style={{ transitionDuration: `${timeout}ms` }} ref={itemRef}>
      {children}
    </div>
  )
}

FadeInItem.propTypes = {
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number
}

export default FadeInItem
