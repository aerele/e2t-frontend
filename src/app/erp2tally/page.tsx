"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Pagination from "../(DashboardLayout)/tables/pagination/page";
import { Box, Grid, TextField } from '@mui/material';
import MyComponent from '../components/tables/MyComponent';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const erp2tally: React.FC = () => {

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
                <Header />
                <MyComponent />
                <Box sx={{ padding: '1rem' }}>
                    <Pagination />
                </Box>
                <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <TextField
                        id="outlined-basic"
                        label="Estimated Cost"
                        variant="outlined"
                        InputProps={{ readOnly: true, value: "sampleValue" }}
                        sx={{ marginRight: '1rem' }}
                    />
                    <TextField
                        id="estimated-time"
                        label="Estimated Time"
                        variant="outlined"
                        InputProps={{ readOnly: true, value: "sampleTime" }}
                        sx={{ marginRight: '1rem' }}
                    />
                    <Button variant="contained" color='success' href='/vouchers'>
                        <span>Export Data</span>
                        <ImportExportIcon sx={{ paddingLeft: '0.1rem', fontSize: 'large' }} />
                    </Button>
                </Box>

            </div>
        </div>
    );
};

export default erp2tally;
