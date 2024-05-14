"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Transactions from "../(DashboardLayout)/tables/transactions/page";
import { Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';



const paymentPage: React.FC = () => {
    // const [age, setAge] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        <Header />
        <Box sx={{padding:'1rem'}}>
            <Transactions />
        </Box>
      </div>    
    </div>
  );
};

export default paymentPage;
