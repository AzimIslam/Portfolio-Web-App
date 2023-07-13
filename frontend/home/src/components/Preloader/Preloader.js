import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

// Components
import Header from '../Header/Header'
import About from '../About/About'
import Experience from '../Experience/Experience'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'
import FadeInItem from '../FadeInItem/FadeInItem'

export default function Preloader () {
  // State to store the response from the backend
  const [response, setResponse] = useState(null)
  const [done, setDone] = useState(undefined)

  // Style for the ReactLoading component
  const reactLoadingStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#273E47'
  }

  useEffect(() => {
    // Creates a GET request to the backend to retrieve the homepage data
    const getHomepageData = async () => {
      await fetch('http://localhost:8000/home/api/get', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => {
          setResponse(data)
          setDone(true)
          // Sets the title of the page to the name of the user
          document.title = data.name
        })
        .catch(err => {
          console.error(err)
        })
    }

    // Add a delay to the getHomepageData function to simulate a loading screen
    setTimeout(() => {
      getHomepageData()
    }, 3000)
  }, [])

  if (done) {
    return (
        <div className="App">
            <Header name={response.name} jobTitle={response.job_title} punchline={response.punchline} cv={response.cv}/>

            <About description={response.about_me} profileImg={response.profile_pic}/>

            <FadeInItem>
              <Experience />
            </FadeInItem>

            <Contact description={response.contact_desc} />

            <Footer name={response.name} linkedinURL={response.linkedin} email={response.email} github={response.github}/>
        </div>
    )
  } else {
    return (
            <div className="reactLoadingWrapper" style={reactLoadingStyle}>
                <ReactLoading type={'bars'} color={'#D8C99B'} height={100} width={100} />
            </div>
    )
  }
}
