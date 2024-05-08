"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import NavCollapse from '../(DashboardLayout)/layout/horizontal/navbar/NavCollapse/NavCollapse';
const home = () => {
  return (
    <div>
      <Sidebar />
      <Header />
    </div>
  );
};

export default home;
