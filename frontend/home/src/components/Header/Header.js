// CSS: frontend\src\components\Header\Header.css
import './Header.css'

// Components
import Nav from './Nav/Nav'

// Main page header component
export default function Header({name, punchline, jobTitle}) {
    return (
        <div id="header">
            <Nav />
            <div className="header-container">
                <h1 id="name">
                    {name.split(' ').map((word, index) => {
                        return (
                            <span key={index}>
                                {word}
                                <br />
                            </span>
                        );
                    })}
                </h1>
                <h2 id="title">{jobTitle}</h2>
                <p id="punchline"> {punchline}</p>
                <a className="button" href="http://www.google.com">Get in Touch</a>
            </div>
        </div>
    );
}