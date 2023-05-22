import React from 'react';
import { createBrowserRouter, BrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';

import Home from './components/pages/home_page';
import About from './components/pages/about_page';
import Event from './components/pages/event_page';
import Create from './components/pages/create_page';

//layouts
import Layout from './components/layout';
import { eventLoader } from './components/pages/event_page';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>  {/* path is "/" */}
      <Route index element={<Home />} /> {/* path is "/" */}
      <Route path="create" element={<Create />} />


      <Route path="event" element={<About />} />
      <Route path='/event/:id' element={<Event />} loader={eventLoader} /> this is a nested route


      <Route path="about" element={<About />} />
      {/* note can create adition layout paths etc */}
    </Route>
  )
)

function App() {
  return (
    // <BrowserRouter>
    //   <main>

    //   </main>
    // </BrowserRouter>

    <RouterProvider router={router} />
  );
}

export default App;
