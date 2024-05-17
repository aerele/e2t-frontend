"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Vouchers from "../(DashboardLayout)/tables/vouchers/page";
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
const Voucher: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        <Header />
        <Box sx={{ padding: '1rem' }}>
          <Vouchers />
        </Box>
        <Box sx={{ padding: '1rem', display: 'flex', alignItems: 'center',justifyContent: 'flex-end'  }}>
          <Typography variant="body1" sx={{ marginRight: '1rem' }}>
            Actual Cost: $1000.25
          </Typography>
          <Button variant="contained" color='success' href="/payment-method">
            <span>Proceed to payment</span>
            <PaymentIcon sx={{ paddingLeft: '0.1rem', fontSize: 'large' }} />
          </Button>
        </Box>

      </div>
    </div>
  );
};

export default Voucher;
