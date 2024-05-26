"use client";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useFrappePostCall } from "frappe-react-sdk";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import PaginationTable from "../(DashboardLayout)/tables/pagination/page";
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import MyComponent from "../components/tables/MyComponent";

interface itemListProps {
	name: string;
	count: number;
	hasValue: boolean;
}

const Erp2tally: React.FC = () => {
	const [voucherList, setVoucherList] = useState<itemListProps[]>([]);

	const { call: getVoucherList } = useFrappePostCall(
		"e2t_backend.api.export_details.get_voucher_list"
	);

	const { call: getVoucherCount } = useFrappePostCall(
		"e2t_backend.api.export_details.get_voucher_count"
	);
	const fetchVoucherCount = (
		site: string,
		company: string,
		fiscalYear: string,
		fromDate: string,
		toDate: string
	) => {
		if (!(site && company && fiscalYear && fromDate && toDate)) {
			toast.error("Fill all filters to fetch data.");
			return;
		}
		getVoucherList({})
			.then((res) => setVoucherList(res.message))
			.catch((err) => toast.error("Unable fetch data."));
		getVoucherCount({
			site,
			company,
			from_date: fromDate,
			to_date: toDate,
		})
			.then((res) => setVoucherList(res.message))
			.catch((err) => toast.error("Unable fetch date"));
	};

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<Sidebar />
			<div style={{ flex: 1, overflowY: "auto", paddingLeft: "2px" }}>
				<Header />
				<MyComponent fetchCount={fetchVoucherCount} />
				<Box sx={{ padding: "1rem" }}>
					<PaginationTable itemList={voucherList} />
				</Box>
				<Box
					sx={{ padding: "1rem", display: "flex", justifyContent: "flex-end" }}
				>
					<TextField
						id="outlined-basic"
						label="Estimated Cost"
						variant="outlined"
						InputProps={{ readOnly: true, value: "sampleValue" }}
						sx={{ marginRight: "1rem" }}
						disabled
					/>
					<TextField
						id="estimated-time"
						label="Estimated Time"
						variant="outlined"
						InputProps={{ readOnly: true, value: "sampleTime" }}
						sx={{ marginRight: "1rem" }}
						disabled
					/>
					<Button variant="contained" color="success" href="/vouchers">
						<span>Export Data</span>
						<ImportExportIcon
							sx={{ paddingLeft: "0.1rem", fontSize: "large" }}
						/>
					</Button>
				</Box>
				<Toaster richColors></Toaster>
			</div>
		</div>
	);
};

export default Erp2tally;
