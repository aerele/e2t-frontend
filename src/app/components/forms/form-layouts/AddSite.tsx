"use client";
import React, { useState } from 'react';
import { Button, Box, Grid, Typography, Snackbar, Alert, IconButton } from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import ParentCard from '../../shared/ParentCard';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { useFrappePostCall } from 'frappe-react-sdk';
import { useRouter } from 'next/navigation';


interface FormData {
  url: string;
  email: string;
  password: string;
}

const AddSite: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    url: '',
    email: '',
    password: '',
  });

  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [data, setData] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen1, setSnackbarOpen1] = useState<boolean>(false);
  const [snackbarOpen2, setSnackbarOpen2] = useState<boolean>(false);
  const [snackbarOpen3, setSnackbarOpen3] = useState<boolean>(false);

  const { call: validateUrl } = useFrappePostCall('e2t_backend.api.validate_url');
  const { call: addSite } = useFrappePostCall('e2t_backend.api.add_site');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await validateUrl({ value: JSON.stringify(formData) });
      console.log('Validation Response:', response.message);
      
      if (response.message === 'Login Failed') {
        setError('Login Failed');
        setIsValidated(false);
        setSnackbarOpen1(true);
      } else {
        setData(response.message);
        setIsValidated(true);
        if (Object.values(response.message).some(val => val === 0)) {
          setSnackbarOpen3(true);
        }
      }
    } catch (error) {
      console.error('Validation Error:', error);
      setError('An unexpected error occurred.');
      setSnackbarOpen1(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(data).every(val => val === 1)) {
      console.log('Form data:', formData);
      addSite({ data: JSON.stringify(formData) });
      setSnackbarOpen2(true);
    }
  };

  const handleSnackbarClose1 = () => {
    setSnackbarOpen1(false);
  };
  const handleSnackbarClose2 = () => {
    setSnackbarOpen2(false);
  };
  const handleSnackbarClose3 = () => {
    setSnackbarOpen3(false);
  };

  const checkValidationStatus = () => {
    if (Object.keys(data).length === 0) {
      return 'no-data';
    }
    if (Object.values(data).some(value => value === 0)) {
      return 'invalid';
    }
    if (Object.values(data).every(value => value === 1)) {
      return 'valid';
    }
    return 'partial';
  };

  const validationStatus = checkValidationStatus();

  const entries = Object.entries(data);
  const firstHalf = entries.slice(0, Math.ceil(entries.length / 2));
  const secondHalf = entries.slice(Math.ceil(entries.length / 2));

  return (
    <Box sx={{ width: '30rem' }}>
      <Grid>
        <Grid item xs={12} sm={12} md={20}>
          <ParentCard title="">
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
              <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
              <CustomTextField
                id="email"
                type="text"
                variant="outlined"
                fullWidth
                value={formData.email}
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
              {Object.keys(data).length !== 0 ? 
              <>
                <CustomFormLabel htmlFor="permission">Permission</CustomFormLabel>
                <Box>
                  {entries.length !== 0 ? (
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        {firstHalf.map(([key, value]) => (
                          <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                            {value === 1 ? <DoneIcon color='success' /> : <ClearIcon color='error' />}
                            <Typography style={{ paddingLeft: "2%" }}>{key}</Typography>
                          </Box>
                        ))}
                      </Grid>
                      <Grid item xs={6}>
                        {secondHalf.map(([key, value]) => (
                          <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                            {value === 1 ? <DoneIcon color='success' /> : <ClearIcon color='error' />}
                            <Typography style={{ paddingLeft: "2%" }}>{key}</Typography>
                          </Box>
                        ))}
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography style={{ fontWeight: 'semibold', fontSize: '10px', marginLeft: '25%', color: 'gray', marginTop: '10%' }}>
                      Fill the fields to Show the PERMISSIONS
                    </Typography>
                  )}
                </Box>
              </> : null
              }
              <div>
                {validationStatus === 'valid' ? (
                  <Button color="primary" variant="contained" type="submit" sx={{ mt: 2, width: '100%' }}>
                    Submit
                  </Button>
                ) : (
                  <Button color="primary" variant="contained" onClick={handleValidate} sx={{ mt: 2, width: '100%' }}>
                    Validate
                  </Button>
                )}
              </div>
            </form>
          </ParentCard>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen1}
        autoHideDuration={6000}
        onClose={handleSnackbarClose1}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose1}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
          <Alert onClose={handleSnackbarClose1} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarOpen3}
        autoHideDuration={6000}
        onClose={handleSnackbarClose3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose3}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
          <Alert onClose={handleSnackbarClose3} severity="error" sx={{ width: '100%' }}>
            Restrictions can be seen for some Documents
          </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarOpen2}
        autoHideDuration={6000}
        onClose={handleSnackbarClose2}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose2}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
          <Alert onClose={handleSnackbarClose2} severity="success" sx={{ width: '100%' }}>
            Site Added Successfully!
          </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddSite;