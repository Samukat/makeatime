import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import Container from 'react-bootstrap/Container';

import { NavigationBar  } from './header.nav';
import { Footer } from './footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {

    document.title = "Makeatime"
    return (
        <div className='layout'>
            <NavigationBar  />  
            <main>
                <Container className='main-content-box'>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </div>
    )
}