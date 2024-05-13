import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { IconChevronDown } from '@tabler/icons-react';
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo"
import DemosDD from './DemosDD';
import AppLinks from '@/app/(DashboardLayout)/layout/vertical/header/AppLinks';
import QuickLinks from '@/app/(DashboardLayout)/layout/vertical/header/QuickLinks';

const MobileSidebar = () => {
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)

    return (
        <>
            <Box px={3}>
                <Logo />
            </Box>
            <Box p={3}>

                <Stack direction="column" spacing={2} >
                    <Button color="inherit" href="#" sx={{
                        justifyContent: 'start'
                    }}>Documentation</Button>
                    <Button color="inherit" href="https://adminmart.com/support" sx={{
                        justifyContent: 'start'
                    }}>Support</Button>
                    <Button color="primary" variant="contained" href="/login">Login</Button>
                </Stack>
            </Box>
        </>


    );
};

export default MobileSidebar;
