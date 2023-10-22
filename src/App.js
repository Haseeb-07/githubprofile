import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import UserRepositories from './UserRepositories';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserRepositories />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
