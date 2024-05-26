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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";

interface siteType {
	name: string;
	url: string;
	email: string;
}
interface companiesType {
	name: string;
}
interface fiscalYearsType {
	name: string;
	year_start_date: string;
	year_end_date: string;
}

interface FetchCountProps {
	fetchCount: (site: string, company: string, fiscalYear: string, fromDate: string, toDate: string) => void;
  }

  const MyComponent: React.FC<FetchCountProps> = ({ fetchCount }) => {
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
	const [sites, setSites] = useState<siteType[]>([]);
	const [companies, setCompanies] = useState<companiesType[]>([]);
	const [fiscalYears, setFiscalYears] = useState<fiscalYearsType[]>([]);
	const [minDate, setMinDate] = useState<String>('');
	const [maxDate, setMaxDate] = useState<String>('');

	const [selectedSite, setSelectedSite] = useState<string>("");
	const [selectedCompany, setSelectedCompany] = useState<string>("");
	const [selectedFiscalYear, setSelectedFiscalYear] = useState<string>("");
	const [selectedFromDate, setSelectedFromDate] = useState<string>("");
	const [selectedToDate, setSelectedToDate] = useState<string>("");

	const { call: getCompany } = useFrappePostCall(
		"e2t_backend.api.export_details.get_company"
	);
	const { call: getFiscalYear } = useFrappePostCall(
		"e2t_backend.api.export_details.get_fiscal_year"
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
					if (res.message) setCompanies(res.message);
				})
				.catch((err) => {
					toast.error(err.message);
				});
	}, [selectedSite]);
	useEffect(() => {
		if (selectedCompany)
			getFiscalYear({
				site: selectedSite,
				company: selectedCompany,
			})
				.then((res) => {
					if (res.message) setFiscalYears(res.message);
				})
				.catch((err) => {
					toast.error(err.message);
				});
	}, [selectedCompany]);

	const handleSiteChange = (event: SelectChangeEvent<string>) => {
		setSelectedSite(event.target.value as string);
	};
	const handleCompanyChange = (event: SelectChangeEvent<string>) => {
		setSelectedCompany(event.target.value as string);
	};
	const handleFiscalYearChange = (
		event: SelectChangeEvent<string>
	) => {
		setSelectedFiscalYear(event.target.value as string);
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
										<MenuItem key={index} value={site?.name}>
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
									{...{ disabled: companies.length != 0 ? false : true }}
								>
									Company
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={age}
									label="Company"
									autoWidth
									{...{ disabled: companies.length != 0 ? false : true }}
									onChange={handleCompanyChange}
								>
									{companies.map((company, index) => (
										<MenuItem key={index} value={company.name}>
											{company.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
							<FormControl sx={{ width: "20rem" }}>
								<InputLabel
									id="demo-simple-select-label"
									{...{ disabled: fiscalYears.length != 0 ? false : true }}
								>
									Fiscal Year
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={age}
									label="Fiscal Year"
									autoWidth
									{...{ disabled: fiscalYears.length != 0 ? false : true }}
									onChange={handleFiscalYearChange}
								>
									{fiscalYears.map((fy, index) => (
										<MenuItem key={index} value={fy.name}>
											{fy.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
							<FormControl sx={{ width: "20rem" }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="From Date"
										value={selectedFromDate}
										onChange={(date) =>
											setSelectedFromDate(dayjs(date).format("YYYY-MM-DD"))
										}
										renderInput={(params) => {
											return <TextField {...params} error={false} />;
										}}
										{...{ disabled: selectedFiscalYear === "" ? true : false }}
									/>
								</LocalizationProvider>
							</FormControl>
						</Grid>
						<Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
							<FormControl sx={{ width: "20rem" }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="To Date"
										value={selectedToDate}
										onChange={(date) =>
											setSelectedToDate(dayjs(date).format("YYYY-MM-DD"))
										}
										renderInput={(params) => {
											return <TextField {...params} error={false} />;
										}}
										{...{ disabled: selectedFiscalYear === "" ? true : false }}
									/>
								</LocalizationProvider>
							</FormControl>
							-
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
							<Button variant="contained" onClick={()=>fetchCount(selectedSite, selectedCompany, selectedFiscalYear, selectedFromDate, selectedToDate)}>
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
