import React from 'react';
import './App.css';

import HeaderBar from './components/HeaderBar'
import PostList from './components/PostList'

function App() {
  return (
    <div>
      <HeaderBar></HeaderBar>
      <PostList/>
    </div>
  );
}

export default App;
