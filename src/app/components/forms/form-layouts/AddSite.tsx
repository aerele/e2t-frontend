import React, { useState } from 'react';
import { Button, Box, Grid, Typography, Alert } from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import ParentCard from '../../shared/ParentCard';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useFrappePostCall } from 'frappe-react-sdk';

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
      } else {
        setData(response.message);
        setIsValidated(true);
      }
    } catch (error) {
      console.error('Validation Error:', error);
      setError('An unexpected error occurred.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(data).every(val => val === 1)) {
      console.log('Form data:', formData);
      addSite({ data: JSON.stringify(formData) });
    }
  };

  return (
    <Box sx={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
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
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="primary" variant="contained" onClick={handleValidate} sx={{ mt: 2 }}>
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
                  <Typography style={{ fontWeight: 'semibold', fontSize: '10px', marginLeft: '25%', color: 'gray', marginTop: '10%' }}>
                    Fill the fields to Show the PERMISSIONS
                  </Typography>
                )}
              </Box>
              <div>
                <Button color="primary" variant="contained" type="submit" sx={{ mt: 2, width: '100%' }}
                  disabled={Object.values(data).some(value => value !== 1) || !isValidated}>
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
