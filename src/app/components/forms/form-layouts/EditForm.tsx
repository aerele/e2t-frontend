import React, { useState, useEffect } from 'react';
import { FormControlLabel, Button, Typography } from '@mui/material';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import ParentCard from '../../shared/ParentCard';
import Editsite from '@/app/(DashboardLayout)/tables/Editsite/page';
import { useFrappeGetDocList, useFrappePostCall } from 'frappe-react-sdk';
import { toast, Toaster } from 'sonner';


interface FetchDetails {
	Site: String;
}

interface FormState {
	url: String;
	email: String;
	password: String;
	confirmPassword: String;
	domain: String;
}

interface itemListProps {
	name: string;
}


const EditForm: React.FC<FetchDetails> = ({ Site }) => {
	const [formState, setFormState] = useState<FormState>({
		url: '',
		email: '',
		password: '',
		confirmPassword: '',
		domain: '',
	});
	const [validate, setValidate] = useState<Boolean>(false);
	const [passwordError, setPasswordError] = useState<Boolean>(false);
	const [company, setCompany] = useState<String>('')
	const [accountList, setAccoutList] = useState<itemListProps[]>([])



	const{call: account_validation} = useFrappePostCall('e2t_backend.api.site_details.validate_url')
	const{call: get_account} = useFrappePostCall("e2t_backend.api.export_details.get_account_list");
	const {call: get_company} = useFrappePostCall('e2t_backend.api.export_details.get_company')

	const { data } = useFrappeGetDocList('Site Details', {
		filters: { 'name': Site },
		fields: ['name', 'url', 'email', 'disable', 'password', 'domain'],
	});

	useEffect(() => {
		if (Site && validate) {
            get_company({ site: Site })
                .then((res) => {
                    setCompany(res.message[0].name);
                    return res.message[0].name;  
                })
                .then((companyName) => {
                    return get_account({ site: Site, company: companyName });
                })
				.then((res) => setAccoutList(res.message))
				.catch((err) => toast.error("Unable to fetch data"));
        }
	},[validate])

	useEffect(() => {
		if (data) {
			setFormState({
				url: data[0].url,
				email: data[0].email,
				password: data[0].password,
				confirmPassword: data[0].password,
				domain: data[0].domain,
			});
		}
	}, [data]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState((prevState) => ({ ...prevState, [name]: value }));

		if (name === 'confirmPassword' || name === 'password') {
			setPasswordError(formState.password !== value && name === 'confirmPassword');
		}
	};

	const handleValidate = async (e: React.FormEvent) => {
		e.preventDefault();
		try {

			account_validation({ value: JSON.stringify(formState) }).then((response) => {
				if (response.message === "Login Failed") {
					toast.error("Login Failed");
					setValidate(false);
				} else {
					setValidate(true);
					if (Object.values(response.message).some((val) => val === 0)) {
						toast.error("Restrictions can be seen for some Documents");
					}
					else{
						toast.success("Validate Successful");
					}
				}
			});
		} catch (error) {
			toast.error("An unexpected error occurred.");
		}
	};

	const handleSave = () => {
		console.log('Form submitted with values:', formState);
	};

	return (
		<ParentCard title="Edit Account">
			<Toaster richColors></Toaster>
			<form>
				<CustomFormLabel htmlFor="url">Url</CustomFormLabel>
				<CustomTextField
					id="url"
					name="url"
					variant="outlined"
					value={formState.url}
					onChange={handleChange}
					fullWidth
					sx={{ mb: '10px' }}
				/>
				<CustomFormLabel htmlFor="email">Email</CustomFormLabel>
				<CustomTextField
					id="email"
					name="email"
					variant="outlined"
					value={formState.email}
					onChange={handleChange}
					fullWidth
				/>
				<CustomFormLabel htmlFor="password">Password</CustomFormLabel>
				<CustomTextField
					id="password"
					name="password"
					type="password"
					variant="outlined"
					value={formState.password}
					onChange={handleChange}
					fullWidth
					sx={{ mb: '10px' }}
				/>
				<CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
				<CustomTextField
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					variant="outlined"
					value={formState.confirmPassword}
					onChange={handleChange}
					fullWidth
					sx={{ mb: '20px' }}
					error={passwordError}
					helperText={passwordError ? 'Passwords do not match' : ''}
				/>
				{validate ? (
					<>
						<Editsite AccountList={accountList} />
						<div style={{ padding: '1rem' }}>
							<Button
								color="primary"
								variant="contained"
								onClick={handleSave}
								disabled={passwordError}
							>
								Save
							</Button>
						</div>
					</>
				) : (
					<div style={{ padding: '1rem' }}>
						<Button color="primary" variant="contained" onClick={handleValidate}>
							Validate
						</Button>
					</div>
				)}
			</form>
		</ParentCard>
	);
};

export default EditForm;
