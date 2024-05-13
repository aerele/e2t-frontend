'use client'

import { Grid } from '@mui/material';
import { AddSite } from '@/app/components/forms/form-layouts/index';
import PageContainer from '@/app/components/container/PageContainer';
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'E2T',
  },
];

const FormLayouts = () => (
  <div  style={{ display: 'flex', height: '100vh' }}>
    <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        <Header />
        <PageContainer title="E2T" description="this is Form Layout">
          
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <AddSite />
            </Grid>
          </Grid>
        </PageContainer>
      </div>
  </div>
);

export default FormLayouts;
