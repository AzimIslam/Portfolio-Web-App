// CSS: frontend\src\components\Header\Header.css
import './Header.css'
import FadeInItem from '../FadeInItem/FadeInItem'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import p5 from 'p5'

// Main page header component
export default function Header ({ name, punchline, jobTitle, cv }) {
  const headerRef = useRef(null)

  useEffect(() => {
    let sketchInstance

    const fadeOutBackground = () => {
      const headerElement = headerRef.current
      let opacity = 1
      const duration = 2000 // Duration in milliseconds
      const interval = 10 // Interval in milliseconds

      const fade = setInterval(() => {
        opacity -= interval / duration
        headerElement.style.backgroundColor = `rgba(39, 62, 71, ${opacity})`

        if (opacity <= 0) {
          clearInterval(fade)
        }
      }, interval)
    }

    // Create a new P5 instance - ignore the warning because p5 is not capitalized
    const createSketch = () => {
      // eslint-disable-next-line new-cap
      sketchInstance = new p5(Sketch)
    }

    // P5.js sketch
    const Sketch = (p) => {
      let bgColor
      const circles = []

      p.setup = () => {
        const headerElement = headerRef.current
        p.createCanvas(headerElement.offsetWidth, headerElement.offsetHeight).parent(headerElement)
        bgColor = p.color('#273E47')

        // Create random circles in the background
        for (let i = 0; i < 50; i++) {
          const x = p.random(p.width)
          const y = p.random(p.height)
          const radius = p.random(10, 50)
          const speed = p.random(0.5, 2)
          const direction = p.random([-1, 1])
          circles.push({ x, y, radius, speed, direction })
        }
      }

      p.draw = () => {
        p.background(bgColor)

        // Update and display the circles in the background
        for (let i = 0; i < circles.length; i++) {
          const circle = circles[i]

          // Move the circles horizontally based on their speed and direction
          circle.x += circle.speed * circle.direction

          // Check if the mouse is hovering over the circle
          if (p.dist(p.mouseX, p.mouseY, circle.x, circle.y) < circle.radius) {
            // Move the circle away from the mouse cursor
            const moveDirection = p.createVector(circle.x - p.mouseX, circle.y - p.mouseY)
            moveDirection.normalize()
            circle.x += moveDirection.x * circle.speed
            circle.y += moveDirection.y * circle.speed
          } else {
            // Move the circles horizontally based on their speed and direction
            circle.x += circle.speed * circle.direction
          }

          // Wrap the circles around the screen
          if (circle.x < -circle.radius) {
            circle.x = p.width + circle.radius
          } else if (circle.x > p.width + circle.radius) {
            circle.x = -circle.radius
          }

          // Display the circles
          p.fill(216, 201, 155, 55)
          p.noStroke()
          p.ellipse(circle.x, circle.y, circle.radius * 2)
        }
      }
    }
    createSketch()
    fadeOutBackground()

    return () => {
      // Clean up
      sketchInstance.remove()
    }
  }, [])

  return (
    <div id="header" ref={headerRef}>
      <div className="header-container">
        <FadeInItem timeout={300}>
          <h1 id="name">
            {name.split(' ').map((word, index) => {
              return (
                <span key={index}>
                  {word}
                  <br />
                </span>
              )
            })}
          </h1>
        </FadeInItem>
        <FadeInItem timeout={600}>
          <h2 id="title">{jobTitle}</h2>
        </FadeInItem>
        <FadeInItem timeout={900}>
          <p id="punchline"> {punchline}</p>
        </FadeInItem>

        <FadeInItem timeout={1200}>
          <a className="button" href={cv}>
            Download CV
          </a>
        </FadeInItem>

        <FadeInItem timeout={1500}>
            <a href="#about">
                <div className="scroll-down"></div>
            </a>
        </FadeInItem>
      </div>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  punchline: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  cv: PropTypes.string.isRequired
}
