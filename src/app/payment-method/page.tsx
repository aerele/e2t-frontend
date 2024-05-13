"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import PaymentComponent from '../components/tables/PaymentComponent';


const Home: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        <Header />
        <PaymentComponent/>
      </div>    
    </div>
  );
};

export default Home;2