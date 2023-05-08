import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import { useEffect, useState } from 'react';



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
  }
}

export default App;
