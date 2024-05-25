"use client";

import { Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import ProductTableList from "@/app/components/TableList/table";

const SearchTable = () => {
	return (
		<PageContainer title="Connected Sites" description="this is Search Table">
			<Box>
				<ProductTableList />
			</Box>
		</PageContainer>
	);
};

export default SearchTable;
