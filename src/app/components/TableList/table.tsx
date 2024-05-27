import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { useSelector, useDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/apps/eCommerce/ECommerceSlice";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";
import CustomSwitch from "../forms/theme-elements/CustomSwitch";
import {
	IconDotsVertical,
	IconFilter,
	IconSearch,
	IconTrash,
} from "@tabler/icons-react";
import { ProductType } from "../../(DashboardLayout)/types/apps/eCommerce";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { AddSite } from "../forms/form-layouts";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useFrappeGetDocList, useFrappeDeleteDoc } from "frappe-react-sdk";
import { useEffect, useState } from "react";
import Link from "next/link";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{ id: "name", numeric: false, disablePadding: false, label: "URL" },
	{ id: "pname", numeric: false, disablePadding: false, label: "User" },
	{ id: "status", numeric: false, disablePadding: false, label: "Status" },
	//   { id: 'price', numeric: false, disablePadding: false, label: 'Permissions' },
	{ id: "action", numeric: false, disablePadding: false, label: "Action" },
];

const staticData = [
	{
		title: "Product 1",
		category: "Category A",
		created: "2024-05-01",
		stock: true,
		price: 100,
		photo: "url_to_photo_1",
	},
	{
		title: "Product 2",
		category: "Category B",
		created: "2024-05-05",
		stock: false,
		price: 150,
		photo: "url_to_photo_2",
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: any) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<CustomCheckbox
						color="primary"
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
	handleSearch: React.ChangeEvent<HTMLInputElement> | any;
	search: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const { numSelected, handleSearch, search } = props;
	const [dialog, setDialog] = useState(false);
	const handleClose = () => {
		setDialog(false);
	};

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle2"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Box sx={{ flex: "1 1 100%" }}>
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconSearch size="1.1rem" />
								</InputAdornment>
							),
						}}
						placeholder="Search Site"
						size="small"
						onChange={handleSearch}
						value={search}
					/>
				</Box>
			)}
			{numSelected > 0 ? null : (
				<Tooltip title="Add Site">
					<Button
						variant="contained"
						sx={{ width: "8rem" }}
						onClick={() => setDialog(true)}
					>
						<span>Add Site</span>
						<AddIcon sx={{ paddingLeft: "0.1rem", fontSize: "large" }} />
					</Button>
				</Tooltip>
			)}
			{numSelected > 1 ? (
				<Tooltip title="Delete">
					<IconButton>
						<IconTrash width="18" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>{/* <IconFilter size="1.2rem" /> */}</IconButton>
				</Tooltip>
			)}
			<Dialog
				open={dialog}
				onClose={handleClose}
				PaperProps={{
					sx: {
						"&::-webkit-scrollbar": {
							width: 0,
						},
						"&::-webkit-scrollbar-track": {
							background: "transparent",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "rgba(0, 0, 0, 0.2)",
							borderRadius: 4,
							border: "0px solid transparent",
						},
					},
				}}
			>
				<DialogTitle>Add Site</DialogTitle>
				<AddSite handleClose={handleClose} />
			</Dialog>
		</Toolbar>
	);
};

const ProductTableList = () => {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<any>("calories");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const {
		data,
		error,
		mutate: refetch_data,
		isValidating,
		isLoading,
	} = useFrappeGetDocList("Site Details", {
		fields: ["name", "domain as url", "email", "disable"],
	});
	const { deleteDoc, isCompleted, loading, reset } = useFrappeDeleteDoc();
	const [sites, setSites] = useState<any[]>([]);
	useEffect(() => {
		if (data) {
			setSites(data);
		}
	}, [data]);

	const handleDelete = async (siteId: any) => {
		try {
			deleteDoc("Site Details", siteId);
			refetch_data();
		} catch (error) {
			console.error("Error deleting site:", error);
		}
	};

	const dispatch = useDispatch();

	//Fetch Products
	React.useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	// const getProducts: ProductType[] = useSelector((state) => state.ecommerceReducer.products);

	const [rows, setRows] = React.useState<any>(sites);
	const [search, setSearch] = React.useState("");

	React.useEffect(() => {
		setRows(sites);
	}, [sites]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const filteredRows: ProductType[] = sites.filter((row) => {
			return row.url.toLowerCase().includes(event.target.value);
		});
		setSearch(event.target.value);
		setRows(filteredRows);
	};

	// This is for the sorting
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: any
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// This is for select all the row
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n: any) => n.title);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	// This is for the single row select
	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const theme = useTheme();
	const borderColor = theme.palette.divider;

	return (
		<Box>
			<Box>
				<EnhancedTableToolbar
					numSelected={selected.length}
					search={search}
					handleSearch={handleSearch}
				/>
				<Paper
					variant="outlined"
					sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}
				>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
							size={dense ? "small" : "medium"}
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row: any, index) => {
										const isItemSelected = isSelected(row.url);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, row.url)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.url}
												selected={isItemSelected}
											>
												<TableCell padding="checkbox">
													<CustomCheckbox
														color="primary"
														checked={isItemSelected}
														inputProps={{ "aria-labelledby": labelId }}
													/>
												</TableCell>
												<TableCell>
													<Box display="flex" alignItems="center">
														<Box
															sx={{
																ml: 2,
															}}
														>
															<Link href="/erp2tally" passHref>
																<Typography component="a">{row.url}</Typography>
															</Link>
														</Box>
													</Box>
												</TableCell>
												<TableCell>
													<Typography>{row.email}</Typography>
												</TableCell>
												<TableCell>
													<Box display="flex" alignItems="center">
														<Box
															sx={{
																backgroundColor: !row.disable
																	? theme.palette.success.main
																	: theme.palette.error.main,
																borderRadius: "100%",
																height: "10px",
																width: "10px",
															}}
														/>
														<Typography
															color="textSecondary"
															variant="subtitle2"
															sx={{ ml: 1 }}
														>
															{!row.disable ? "Active" : "Inactive"}
														</Typography>
													</Box>
												</TableCell>
												{/* <TableCell>
                        </TableCell> */}
												<TableCell>
													<IconButton onClick={() => handleDelete(row.name)}>
														<IconTrash size="1.2rem" />
													</IconButton>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</Box>
	);
};

export default ProductTableList;
