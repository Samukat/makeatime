import React from 'react';
import './index.scss';
import { Outlet } from 'react-router-dom';
import HomePage from '../HomePage/index';

const Layout = () => {
    return (
      <>
        <HomePage />
        <Outlet />
      </>
    );
  };

export default Layout