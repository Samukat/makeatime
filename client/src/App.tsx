import React from 'react';
import {BrowserRouter ,Routes, Route, Link, NavLink} from 'react-router-dom';
import './App.css';

import Home from './components/pages/home_page';
import About from './components/pages/about_page';
import Event from './components/pages/event_page';
import Create from './components/pages/create_page';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/event" element={<Event />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
