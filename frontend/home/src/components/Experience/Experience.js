// CSS: frontend\src\components\Experience\Experience.css
import './Experience.css'

// Dependencies for MUI Card Component
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';

// Skills component
export default function Experience() {

    // This state stores all work experiences
    const [experiences, setExperiences] = useState([]);

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

    return (
        <div id="experience">
            <div id="experienceContainer">
                <h1 id="experienceTitle">Experience</h1>
                
                <div className='experiences'>
                    {
                        experiences.map((experience) => { 
                            return (
                                <Card sx={{ maxWidth: 345 }} style={{margin: 10}}>
                                    <CardActionArea>
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
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}