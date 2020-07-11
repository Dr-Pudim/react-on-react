import React from 'react';
import logo from '../logo.svg';

function LoadingScreen(){
    return (
        <div className="LoadingScreen">
            <h2>Loading</h2>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

export default LoadingScreen;