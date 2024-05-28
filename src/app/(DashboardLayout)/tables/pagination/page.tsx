"use client";

import * as React from "react";

import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import PageContainer from "@/app/components/container/PageContainer";

import BlankCard from "@/app/components/shared/BlankCard";
import ParentCard from "@/app/components/shared/ParentCard";
import CircularProgress from "@mui/material/CircularProgress";

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number
	) => void;
}

interface itemListProps {
	name: string;
	count: number;
	hasValue: boolean;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event: any) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: any) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

const PaginationTable = ({ itemList = [] }: { itemList: itemListProps[] }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(15);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemList.length) : 0;

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const {data} = useFrappeGetDocCount("Sales Order", filters?: {  } )

	return (
		<PageContainer
			title="Export to Tally"
			description="this is Pagination Table"
		>
				<BlankCard>
					<TableContainer>
						<Table
							aria-label="custom pagination table"
							sx={{
								whiteSpace: "nowrap",
							}}
						>
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
							<TableBody>
								{(rowsPerPage > 0
									? itemList.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: itemList
								).map((row: itemListProps) => (
									<TableRow key={row.name}>
										<TableCell>
											<Typography variant="subtitle2">{row.name}</Typography>
										</TableCell>
										<TableCell>
											<Typography
												color="textSecondary"
												variant="h6"
												fontWeight="400"
											>
												{row.hasValue ? (
													row.count
												) : (
													<CircularProgress color="primary" size="1rem" />
												)}
											</Typography>
										</TableCell>
									</TableRow>
								))}

								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											15,
											30,
											50,
											{ label: "All", value: -1 },
										]}
										colSpan={6}
										count={itemList.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											native: true,
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</BlankCard>
		</PageContainer>
	);
};

export default PaginationTable;
