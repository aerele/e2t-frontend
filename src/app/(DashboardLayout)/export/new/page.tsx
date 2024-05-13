'use client'

import { Box } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
import ProductTableList from '@/app/components/TableList/new';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to:'/table/export',
    title: 'Export',
  },
];

const SearchTable = () => {
  return (
    <PageContainer title="Search Table" description="this is Search Table">
      <Box>
        <ProductTableList />
      </Box>
    </PageContainer>
  );
};

export default SearchTable;
