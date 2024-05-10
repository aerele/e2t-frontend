import React from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const PaymentComponent: React.FC = () => {
    return (
        <>
            <Box sx={{ width: '100%', marginTop:'1rem', paddingLeft:'1rem' }}>
                <Grid container spacing={2} alignItems="center" item xs={5} sm={15} sx={{ paddingLeft: '1rem', paddingTop: '1rem', width: '100%' }}>
                    <Grid>
                        <Button variant="text" href='/payment-page'>
                            <ArrowBackIcon sx={{ paddingRight: '0.1rem', fontSize:'small' }} />
                            <span>Payment Method</span>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" item xs={5} sm={15} sx={{ paddingLeft: '1rem', marginTop: '1rem', width: '100%' }}>
                    <Grid>
                        <Button variant="text" href='/payment-page'>
                            <ArrowBackIcon sx={{ paddingRight: '0.1rem', fontSize:'small' }} />
                            <span>Payment Method</span>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PaymentComponent;
