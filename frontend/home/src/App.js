import './App.css';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Error from './components/Error/Error';

// React
import { useEffect, useState } from 'react';

// Icons
import { MdError } from 'react-icons/md'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // State to store the response from the backend
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Creates a GET request to the backend to retrieve the homepage data
    const getHomepageData = async () => {
      await fetch('http://localhost:8000/home/api/get', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => {
        setResponse(data);
        
        // Sets the title of the page to the name of the user
        document.title = data.name
      })
      .catch(err => {
        console.error(err);
      });
    };
    getHomepageData();
  }, []);

  if(response) {
    return (
      <div className="App">
        <Header name={response.name} jobTitle={response.job_title} punchline={response.punchline}/>
        <About description={response.about_me} profileImg={response.profile_pic}/>
        <Experience />
        <Footer name={response.name} linkedinURL={response.linkedin} email={response.email} github={response.github}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Error icon={<MdError />}>
          Oops! Something went wrong on the web server. 
          Please try again later or contact the system administrator for assistance. 
          We apologize for any inconvenience caused.
        </Error>
      </div>
    );
  }
}

export default App;
