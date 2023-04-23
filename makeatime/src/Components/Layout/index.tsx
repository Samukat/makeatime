import React from 'react';
import './index.scss';
import { Outlet } from 'react-router-dom';
import HomePage from '../HomePage/index';
import NavigationBar from '../NavigationBar/index';

const Layout = () => {
    return (
      <>
        <NavigationBar />
        <Outlet />
      </>
    );
  };

export default Layout