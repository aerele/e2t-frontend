import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useFrappeGetDocList, useFrappePostCall } from "frappe-react-sdk";
import React, { useEffect, useState } from "react";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { Toaster, toast } from "sonner";

const MyComponent: React.FC = () => {
	const {
		data,
		error,
		mutate: refetch_data,
		isValidating,
		isLoading,
	} = useFrappeGetDocList("Site Details", {
		fields: ["name", "domain as url", "email"],
		filters: [["disable", "=", 0]],
	});
	const [sites, setSites] = useState<string[]>([]);
	const [companies, setCompanies] = useState<string[]>([]);
	const [selectedSite, setSelectedSite] = useState<string>("");
	const [selectedCompany, setSelectedCompany] = useState<string>("");
	const [selectedFiscalYear, setSelectedFiscalYear] = useState<string>("");
	const [selectedFromDate, setSelectedFromDate] = useState<string>("");
	const [selectedToDate, setSelectedToDate] = useState<string>("");

	const { call: getCompany } = useFrappePostCall(
		"e2t_backend.api.export_details.get_company"
	);
	useEffect(() => {
		if (data) {
			setSites(data);
		}
	}, [data]);
	useEffect(() => {
		if (selectedSite)
			getCompany({
				site: selectedSite,
			})
				.then((res) => {
					if (res.message) setCompanies(res.message.data);
				})
				.catch((err) => {
					toast.error(err.message);
				});
	}, [selectedSite]);
	const handleSiteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedSite(event.target.value as string);
	};
	const handleCompanyChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setSelectedCompany(event.target.value as string);
	};
	return (
		<div>
			<Toaster richColors></Toaster>
			<Grid
				container
				spacing={2}
				alignItems="flex-end"
				item
				xs={10}
				sm={15}
				sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}
			>
				<Box sx={{ width: "85%" }}>
					<Grid
						container
						spacing={2}
						alignItems="center"
						item
						xs={10}
						sm={15}
						sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}
					>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
							<FormControl sx={{ width: "20rem" }}>
								<InputLabel id="demo-simple-select-label">Site</InputLabel>
								<Select
									labelId="site-select-label"
									id="site-select"
									value={selectedSite}
									label="Site"
									onChange={handleSiteChange}
								>
									{sites.map((site, index) => (
										<MenuItem key={index} value={site.name}>
											{`${site.url} (${site.email})`}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
							<FormControl sx={{ width: "20rem" }}>
								<InputLabel
									id="demo-simple-select-label"
									{...{ disabled: companies != "" ? false : true }}
								>
									Company
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={age}
									label="Company"
									autoWidth
									{...{ disabled: companies != "" ? false : true }}
									onChange={handleCompanyChange}
								>
									{companies.map((site, index) => (
										<MenuItem key={index} value={site.name}>
											{site.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
							<FormControl sx={{ width: "20rem" }}>
								<InputLabel
									id="demo-simple-select-label"
									{...{ disabled: selectedCompany != "" ? false : true }}
								>
									Fiscal Year
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={age}
									label="Fiscal Year"
									autoWidth
									{...{ disabled: selectedCompany != "" ? false : true }}
									// onChange={handleChange}
								>
									<MenuItem value="Google">Aerele</MenuItem>
									<MenuItem value="FierFox">SD</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
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
								{...{ disabled: selectedFiscalYear != "" ? false : true }}
							/>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
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
								{...{ disabled: selectedFiscalYear != "" ? false : true }}
							/>
						</Grid>
					</Grid>
				</Box>
				<Box sx={{ width: "15%" }}>
					<Grid
						container
						spacing={2}
						alignItems="center"
						item
						xs={10}
						sm={15}
						sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}
					>
						<Grid sx={{ paddingLeft: "3rem", paddingTop: "1rem" }}>
							<Button variant="contained">
								<span>Fetch</span>
								<ArrowForwardIosIcon
									sx={{ paddingLeft: "0.1rem", fontSize: "small" }}
								/>
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</div>
	);
};

export default MyComponent;
