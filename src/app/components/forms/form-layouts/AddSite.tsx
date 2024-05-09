import React, { useState } from 'react';
import {FormControlLabel, Button, Box, Grid, Typography } from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import ParentCard from '../../shared/ParentCard';
import CustomCheckbox from '../theme-elements/CustomCheckbox';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const AddSite = () => {
  const [formData, setFormData] = useState({
    url: '',
    username: '',
    password: '',
  });

  let val: number = 0;
  const data: { [key: string]: number } = {
    admin: 1,
    user: 1,
    guest: 1
  };

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== 1) {
        val = 0;
        break;
      } else {
        val = 1;
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // You can send the form data to your backend or do any other processing here
  };

  return (
    <Box sx={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop:'3rem' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ParentCard title="Add Site">
            <form onSubmit={handleSubmit}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="url"
              >
                Url
              </CustomFormLabel>
              <CustomTextField
                id="url"
                variant="outlined"
                defaultValue=""
                fullWidth
                value={formData.url}
                onChange={handleChange}
              />
              <CustomFormLabel htmlFor="username">UserName</CustomFormLabel>
              <CustomTextField
                id="username"
                type="text"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
              />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                  Validate
                </Button>
              </Box>
              <CustomFormLabel htmlFor="permission">Permission</CustomFormLabel>
              <Box sx={{ height: '100px', overflowY: 'auto' }}>
                {Object.entries(data).length !== 0 ? (
                  Object.entries(data).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                      {value === 1 ? <DoneIcon color='success' /> : <ClearIcon color='error' />}
                      <Typography style={{ paddingLeft: "2%" }}>{key}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography style={{fontWeight:'semibold', fontSize:'10px', marginLeft:'25%', color:'gray', marginTop:'10%'}}>
                    Fill the fields to Show the PERMISSIONS
                  </Typography>
                )}
              </Box>
              <div>
                <Button color="primary" variant="contained" type="submit" sx={{ mt: 2, width: '100%' }} 
                  disabled={val === 0}>
                  Submit
                </Button>
              </div>
            </form>
          </ParentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddSite;
