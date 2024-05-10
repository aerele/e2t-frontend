"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import PaymentTable from '../components/tables/PaymentTable';
import { Box, Grid, TextField } from '@mui/material';
import MyComponent from '../components/tables/MyComponent';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';



const Home: React.FC = () => {
    // const [age, setAge] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        <Header />
        <MyComponent/>
        <Box sx={{padding:'1rem', overflowY:'auto', height:'24.5rem', marginTop:'1rem'}}>
            <PaymentTable />
        </Box>
        <Box sx={{padding:'1rem'}}>
            <Grid container spacing={2} alignItems="center" item xs={5} sm={15} sx={{ paddingLeft: '1rem', paddingTop: '1rem', width: '100%' }}>
              <Grid sx={{ paddingTop: '1rem' }}>
                  <TextField id="outlined-basic" label="Explot Cost" variant="outlined" sx={{ width: '300px' }} />
              </Grid>
              <Grid sx={{ paddingLeft: '37rem', paddingTop: '1rem' }}>
                <Button variant="contained" color='success'>
                    <span>Payment</span>
                    <PaymentIcon sx={{paddingLeft:'0.1rem', fontSize:'small'}} />
                </Button>
              </Grid>
            </Grid>
        </Box>
      </div>    
    </div>
  );
};

export default Home;
