"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Pagination from "../(DashboardLayout)/tables/pagination/page";
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Voucher: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        <Header />
        <Pagination />
        <Box sx={{padding:'1rem'}}>
            <Grid container spacing={2} alignItems="center" item xs={5} sm={15} sx={{ paddingTop: '0.5rem', width: '100%' }}>
              <Grid sx={{ paddingLeft: '55rem'}}>
                <Button variant="contained" color='success'>
                    <span>Download</span>
                    <DownloadForOfflineIcon sx={{paddingLeft:'0.1rem', fontSize:'small'}} />
                </Button>
              </Grid>
            </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Voucher;
