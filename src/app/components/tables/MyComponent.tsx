import React, {useState, useEffect} from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { useFrappeGetCall } from 'frappe-react-sdk';




const MyComponent: React.FC = () => {
  const { data } = useFrappeGetCall('e2t_backend.api.site_details.fetch_site');
  const [sites, setSites] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>('');
  useEffect(() => {
    if (data && data.message && data.message.site) {
      setSites(data.message.site);
    }
  }, [data]);
  const handleSiteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSite(event.target.value as string);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} alignItems="center" item xs={10} sm={15} sx={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
        <Grid sx={{ paddingLeft: '1rem', paddingTop: '1rem' }}  >
          <FormControl sx={{ width: '20rem' }}>
            <InputLabel id="demo-simple-select-label">Site</InputLabel>
            <Select
              labelId="site-select-label"
              id="site-select"
              value={selectedSite}
              label="Site"
              onChange={handleSiteChange}
            >
              {sites.map((site, index) => (
                <MenuItem key={index} value={site}>{site}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
          <FormControl sx={{ width: '20rem' }} >
            <InputLabel id="demo-simple-select-label">Company</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Company"
              autoWidth
            // onChange={handleChange}
            >
              <MenuItem value="Google">Aerele</MenuItem>
              <MenuItem value="FierFox">SD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
          <TextField id="outlined-basic" label="Fiscal Year" variant="outlined" sx={{ width: '20rem' }} />
        </Grid>
        <Grid sx={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
          {/* <TextField id="outlined-basic" label="From Date" variant="outlined" sx={{ width: '120px' }} /> */}
          <CustomTextField
            id="date"
            type="date"
            label="From Date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid sx={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
          {/* <TextField id="outlined-basic" label="To Date" variant="outlined" sx={{ width: '120px' }} /> */}
          <CustomTextField
            id="date"
            type="date"
            label="To Date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid sx={{ paddingLeft:'3rem', paddingTop: '1rem' }}>
          <Button variant="contained">
            <span>Fetch</span>
            <ArrowForwardIosIcon sx={{ paddingLeft: '0.1rem', fontSize: 'small' }} />
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
};

export default MyComponent;
