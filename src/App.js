import React from 'react';
import './App.css';

import HeaderBar from './components/HeaderBar';
import PostBrowser from './components/PostBrowser';

function App() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <PostBrowser></PostBrowser>
    </div>
  );
}

export default App;
