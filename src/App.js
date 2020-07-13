import React from 'react';
import './App.css';

import HeaderBar from './components/HeaderBar'
import PostList from './components/PostList'

function App() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <div id="postHolder">
        <PostList/>
      </div>
    </div>
  );
}

export default App;
