import React from 'react';
import sadFace from '../sad-face-in-rounded-square.svg';

function ErrorScreen(props){
    return(
        <div className="ErrorScreen">
            <h2>{props.message}</h2>
            <img src={sadFace} alt="sad face" title="Icon made by Freepik at https://www.flaticon.com/"/>
        </div>
    );
}

export default ErrorScreen;