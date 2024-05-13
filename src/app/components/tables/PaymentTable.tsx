import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Chip,
  TableHead,
} from '@mui/material';
import BlankCard from '../shared/BlankCard';
import { Box, Stack } from '@mui/system';
import { size } from 'lodash';
import { Padding } from '@mui/icons-material';

const rows = [
  {
    status: 'active',
    avatar: "/images/blog/blog-img1.jpg",
    users: '4300',
    title: 'Top Authors',
    subtitle: 'Successful Fellas',
    teams: [
      { name: 'Angular', bgcolor: 'error.light', textcolor: 'error.main' },
      { name: 'PHP', bgcolor: 'primary.light', textcolor: 'primary.main' },
    ],
  },
  {
    status: 'offline',
    avatar: "/images/blog/blog-img2.jpg",
    users: '1200',
    title: 'Popular Authors',
    subtitle: 'Most Successful',
    teams: [{ name: 'Bootstrap', bgcolor: 'primary.light', textcolor: 'primary.main' }],
  },
  {
    status: 'offline',
    avatar: "/images/blog/blog-img2.jpg",
    users: '1200',
    title: 'Popular Authors',
    subtitle: 'Most Successful',
    teams: [{ name: 'Bootstrap', bgcolor: 'primary.light', textcolor: 'primary.main' }],
  },
  {
    status: 'offline',
    avatar: "/images/blog/blog-img2.jpg",
    users: '1200',
    title: 'Popular Authors',
    subtitle: 'Most Successful',
    teams: [{ name: 'Bootstrap', bgcolor: 'primary.light', textcolor: 'primary.main' }],
  },
  {
    status: 'offline',
    avatar: "/images/blog/blog-img2.jpg",
    users: '1200',
    title: 'Popular Authors',
    subtitle: 'Most Successful',
    teams: [{ name: 'Bootstrap', bgcolor: 'primary.light', textcolor: 'primary.main' }],
  },
  {
    status: 'offline',
    avatar: "/images/blog/blog-img2.jpg",
    users: '1200',
    title: 'Popular Authors',
    subtitle: 'Most Successful',
    teams: [{ name: 'Bootstrap', bgcolor: 'primary.light', textcolor: 'primary.main' }],
  },
  {
    status: 'offline',
    avatar: "/images/blog/blog-img2.jpg",
    users: '1200',
    title: 'Popular Authors',
    subtitle: 'Most Successful',
    teams: [{ name: 'Bootstrap', bgcolor: 'primary.light', textcolor: 'primary.main' }],
  },
];

const PaymentTable = () => {
  return (
    //create a headre feild and add 3 link buttons
    <BlankCard sx={{Padding:'10rem'}}>
      <TableContainer sx={{Padding:'10rem', }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Voucher Type</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Count</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{overflowY:'auto', height:'1rem'}}>
            {rows.map((row) => (
              <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      src={row.avatar}
                      alt={row.avatar}
                      variant="rounded"
                      sx={{ width: 42, height: 42 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {row.title}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {row.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  {/* <Stack direction="row" spacing={1}>
                    {row.teams.map((team, i) => (
                      <Chip
                        label={team.name}
                        sx={{
                          backgroundColor: team.bgcolor,
                          color: team.textcolor,
                          fontSize: '11px',
                        }}
                        key={i}
                        size="small"
                      />
                    ))}
                  </Stack> */}
                  <p style={{fontSize:'11px'}}>
                    count
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default PaymentTable;
