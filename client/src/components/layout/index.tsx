import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';

import { Navbar } from './header.nav';
import { Footer } from './footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    return (
        <div className='layout'>
            <Navbar />  
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}