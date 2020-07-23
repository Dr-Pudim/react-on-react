import React from 'react';

function ErrorScreen(props){
    return(
        <div className="ErrorScreen">
            <h2>{props.message}</h2>
        </div>
    );
}

export default ErrorScreen;