// CSS: frontend\src\components\Experience\Experience.css
import './Experience.css'

// Dependencies for MUI Card Component
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';

// Dependences for Bootstrap Modal
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

// Skills component
export default function Experience() {

    // This state stores all work experiences
    const [experiences, setExperiences] = useState([]);

    // This state handles the opening and closing of the modal
    const [openModals, setOpenModals] = useState([]);

    // This function calculates the duration of the work experience
    function calculateDuration(yearsDiff, monthsDiff) {
        if (yearsDiff > 0) {
            return yearsDiff === 1 ? `${yearsDiff} year` : `${yearsDiff} years`;
        } else if (monthsDiff >= 0) {
            return monthsDiff === 0 ? 'less than a month' : `${monthsDiff} month${monthsDiff === 1 ? '' : 's'}`;
        } else {
            return 'Invalid dates';
        }
    }

    useEffect(() => {
        // Fetches all work experiences from the backend
        async function getExperiences() {
            await fetch('http://localhost:8000/home/api/getExperience', {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                setExperiences(data.experience);
            });
        };

        getExperiences();
    }, []);

    useEffect(() => {
        setOpenModals(experiences.map(() => false));
    }, [experiences]);

    return (
        <div id="experience">
            <div id="experienceContainer">
                <h1 id="experienceTitle">Experience</h1>
                
                <div className='experiences'>
                    {
                        experiences.map((experience, index) => { 
                            const start = new Date(experience.start_date);
                            const end = experience.present ? new Date() : new Date(experience.end_date);

                            const yearsDiff = end.getFullYear() - start.getFullYear();
                            const monthsDiff = end.getMonth() - start.getMonth();
                            const duration = calculateDuration(yearsDiff, monthsDiff);
                            return (
                                <>
                                    <Card sx={{ maxWidth: 345 }} style={{margin: 10}}>
                                        <CardActionArea onClick={() => setOpenModals(prevState => {
                                            const updatedModals = [...prevState];
                                            updatedModals[index] = true;
                                            return updatedModals;
                                        })}>
                                            <CardMedia
                                            style={{
                                                width: '90%',
                                                margin: 'auto',
                                                paddingTop: '10%',
                                                paddingBottom: '10%'
                                            }}
                                            component="img"
                                            image={`http://localhost:8000/${experience.logo}`}
                                            alt={experience.company}
                                            />
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {experience.company}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {experience.company_description} 
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>

                                    <Modal show={openModals[index]} onHide={() => setOpenModals(prevState => {
                                        const updatedModals = [...prevState];
                                        updatedModals[index] = false;
                                        return updatedModals;
                                    })}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{experience.company}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="field">
                                                <h6>Position</h6>
                                                <p>{experience.job_title}</p>
                                            </div>

                                            <div className="field">
                                                <h6>Start Date</h6>
                                                <p>{new Date(experience.start_date).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                            </div>

                                            <div className="field">
                                                <h6>End Date</h6>
                                                <p>{experience.present ? "Present" : new Date(experience.end_date).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                            </div>

                                            <div className="field">
                                                <h6>Duration</h6>
                                                <p>{duration}</p>
                                            </div>

                                            <div className="field">
                                                <h6>Responsibilities</h6>
                                                <ListGroup style={{marginTop: 10}}>
                                                    {experience.experience_description.map((responsibility) => {
                                                        return (
                                                            <ListGroup.Item style={{fontSize: "10pt"}}>{responsibility}</ListGroup.Item>
                                                        );
                                                    })}
                                                </ListGroup>
                                            </div>

                                            <div className="field">
                                                <h6>Skills</h6>
                                                <div className="skills">
                                                    {experience.skills.map((skill) => {
                                                        return (
                                                            <Badge bg="white" text="dark" style={{border: "1px solid DarkGrey", padding: "0.5em", margin: "0.25em"}}>
                                                                <img src={`http://localhost:8000/${skill.logo}`} alt={skill.name} style={{marginRight: "0.5em", height: "24px", width: "24px"}}/>
                                                                {skill.name}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}