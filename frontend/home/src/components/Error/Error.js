// CSS: frontend\src\components\Error\Error.css
import './Error.css'

// Error component
export default function Error({title="Something went wrong", icon, children}) {
    return (
        <div id="error">
            <div id="errorContainer">
                <h1 id="errorTitle">{title}</h1>
                
                {icon}

                <p id="errorDescription">
                    {children}
                </p>
            </div>
        </div>
    )
}
