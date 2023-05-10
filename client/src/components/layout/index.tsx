import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';

import { NavigationBar  } from './header.nav';
import { Footer } from './footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    return (
        <div className='layout'>
            <NavigationBar  />  
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}