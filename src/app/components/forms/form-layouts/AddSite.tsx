"use client";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import {
	Box,
	Button,
	Grid,
	Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk";
import React, { FC, useState } from "react";
import { Toaster, toast } from "sonner";
import ParentCard from "../../shared/ParentCard";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomTextField from "../theme-elements/CustomTextField";

interface FormData {
	url: string;
	email: string;
	password: string;
}
interface AddSiteProps {
	handleClose: () => void;
}

interface ValidateionTypeMap {
	0: FC<any>;
	1: FC<any>;
	2: FC<any>;
}
const ClearIconComponent: FC<any> = () => <ClearIcon color="error" />;
const DoneIconComponent: FC<any> = () => <DoneIcon color="success" />;
const CircularProgressComponent: FC<any> = () => (
  <CircularProgress color="primary" size="1rem" />
);
const AddSite: React.FC<AddSiteProps> = ({ handleClose }) => {
	const [formData, setFormData] = useState<FormData>({
		url: "",
		email: "",
		password: "",
	});

	const [isValidated, setIsValidated] = useState<boolean>(false);
	const [data, setData] = useState<{ [key: string]: number }>({});

	const { call: validateUrl } = useFrappePostCall(
		"e2t_backend.api.site_details.validate_url"
	);
	const { call: addSite } = useFrappePostCall(
		"e2t_backend.api.site_details.add_site"
	);

	const { data: exportingVouchers } = useFrappeGetCall(
		"e2t_backend.api.site_details.get_exporting_vouchers"
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: value,
		}));
	};

	const handleValidate = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setData(exportingVouchers.message);

			validateUrl({ value: JSON.stringify(formData) }).then((response) => {
				if (response.message === "Login Failed") {
					toast.error("Login Failed");
					setIsValidated(false);
				} else {
					setData(response.message);
					setIsValidated(true);
					if (Object.values(response.message).some((val) => val === 0)) {
						toast.error("Restrictions can be seen for some Documents");
					}
				}
			});
		} catch (error) {
			toast.error("An unexpected error occurred.");
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (Object.values(data).every((val) => val === 1)) {
			addSite({ data: JSON.stringify(formData) }).then(()=>{

				toast.success("Site Added Successfully");
				handleClose();
			}).catch(()=>{
				toast.error("Something went wrong, please try again!")
			});
		}
	};
	const checkValidationStatus = () => {
		if (Object.keys(data).length === 0) {
			return "no-data";
		}
		if (Object.values(data).some((value) => value === 0)) {
			return "invalid";
		}
		if (Object.values(data).every((value) => value === 1)) {
			return "valid";
		}
		return "partial";
	};

	const validationStatus = checkValidationStatus();

	const entries = Object.entries(data);
	const firstHalf = entries.slice(0, Math.ceil(entries.length / 2));
	const secondHalf = entries.slice(Math.ceil(entries.length / 2));

	const validation_map: ValidateionTypeMap = {
		0: ClearIconComponent,
		1: DoneIconComponent,
		2: CircularProgressComponent,
	  };

	return (
		<Box sx={{ width: "30rem" }}>
			<Toaster richColors></Toaster>
			<Grid>
				<Grid item xs={12} sm={12} md={20}>
					<ParentCard title="">
						<form onSubmit={handleSubmit}>
							<CustomFormLabel
								sx={{
									mt: 0,
								}}
								htmlFor="url"
							>
								Url
							</CustomFormLabel>
							<CustomTextField
								id="url"
								variant="outlined"
								defaultValue=""
								fullWidth
								value={formData.url}
								onChange={handleChange}
							/>
							<CustomFormLabel htmlFor="email">Email</CustomFormLabel>
							<CustomTextField
								id="email"
								type="text"
								variant="outlined"
								fullWidth
								value={formData.email}
								onChange={handleChange}
							/>
							<CustomFormLabel htmlFor="password">Password</CustomFormLabel>
							<CustomTextField
								id="password"
								type="password"
								autoComplete="current-password"
								variant="outlined"
								fullWidth
								value={formData.password}
								onChange={handleChange}
							/>
							{Object.keys(data).length !== 0 ? (
								<>
									<CustomFormLabel htmlFor="permission">
										Permission
									</CustomFormLabel>
									<Box>
										{entries.length !== 0 ? (
											<Grid container spacing={2}>
												<Grid item xs={6}>
													{firstHalf.map(([key, value]: [string, Number]) => (
														<Box
															key={key}
															sx={{ display: "flex", alignItems: "center" }}
														>
															{validation_map[value]}
															<Typography style={{ paddingLeft: "2%" }}>
																{key}
															</Typography>
														</Box>
													))}
												</Grid>
												<Grid item xs={6}>
													{secondHalf.map(([key, value]: [string, Number]) => (
														<Box
															key={key}
															sx={{ display: "flex", alignItems: "center" }}
														>
															{validation_map[value]}
															<Typography style={{ paddingLeft: "2%" }}>
																{key}
															</Typography>
														</Box>
													))}
												</Grid>
											</Grid>
										) : (
											<Typography
												style={{
													fontWeight: "semibold",
													fontSize: "10px",
													marginLeft: "25%",
													color: "gray",
													marginTop: "10%",
												}}
											>
												Fill the fields to Show the PERMISSIONS
											</Typography>
										)}
									</Box>
								</>
							) : null}
							<div>
								{validationStatus === "valid" ? (
									<Button
										color="primary"
										variant="contained"
										type="submit"
										sx={{ mt: 2, width: "100%" }}
									>
										Submit
									</Button>
								) : (
									<Button
										color="primary"
										variant="contained"
										onClick={handleValidate}
										sx={{ mt: 2, width: "100%" }}
									>
										Validate
									</Button>
								)}
							</div>
						</form>
					</ParentCard>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddSite;
