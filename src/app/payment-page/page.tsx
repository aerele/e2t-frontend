"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Pagination from "../(DashboardLayout)/tables/pagination/page";
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
            <Pagination />
        </Box>
        <Box sx={{padding:'1rem'}}>
            <Grid container spacing={2} alignItems="center" item xs={15} sm={15} sx={{ paddingLeft: '1rem', paddingTop: '1rem', width: '100%' }}>
              <Grid sx={{ paddingTop: '1rem', marginLeft:'1rem' }}>
                  <TextField id="outlined-basic" label="Explot Cost" variant="outlined" style={{ width: '150px' }} />
              </Grid>
              <Grid sx={{ marginLeft: '1rem', paddingTop: '1rem' }}>
                <Button variant="contained" color='success' href='payment-method'>
                    <span>Proceed To Payment</span>
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
