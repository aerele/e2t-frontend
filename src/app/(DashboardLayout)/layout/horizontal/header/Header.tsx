
import {
	setEmail,
	setFullname,
	setImage,
	setTimezone,
} from "@/store/apps/userProfile/UserProfileSlice";
import { toggleMobileSidebar } from "@/store/customizer/CustomizerSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Theme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconMenu2 } from "@tabler/icons-react";
import { useFrappePostCall } from "frappe-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notifications from "../../vertical/header/Notification";
import Profile from "../../vertical/header/Profile";
import Search from "../../vertical/header/Search";


const Header = () => {
	const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

	// drawer
	const customizer = useSelector((state: AppState) => state.customizer);
	const userProfile = useSelector((state: AppState) => state.userProfileReducer);
	const dispatch = useDispatch();
	const router = useRouter();

	const { call } = useFrappePostCall(
		"e2t_backend.api.user_details.get_user_details"
	);
	useEffect(() => {
		if(!userProfile.fullname)
		call({})
			.then((res) => {

				dispatch(setFullname(res.message.fullname));
				dispatch(setEmail(res.message.email));
				dispatch(setImage(res.message.image));
				dispatch(setTimezone(res.message.time_zone));
			})
			.catch((err) => {
				router.push("/login");
			});
	}, [dispatch]);

	const AppBarStyled = styled(AppBar)(({ theme }) => ({
		background: theme.palette.background.paper,
		justifyContent: "center",
		backdropFilter: "blur(4px)",

		[theme.breakpoints.up("lg")]: {
			minHeight: customizer.TopbarHeight,
		},
	}));
	const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
		margin: "0 auto",
		width: "100%",
		color: `${theme.palette.text.secondary} !important`,
	}));

	return (
		<AppBarStyled position="sticky" color="default" elevation={8}>
			<ToolbarStyled
				sx={{
					maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
				}}
			>
				<Box sx={{ width: lgDown ? "45px" : "auto", overflow: "hidden" }}>
					{/* <Logo /> */}
				</Box>
				{/* ------------------------------------------- */}
				{/* Toggle Button Sidebar */}
				{/* ------------------------------------------- */}
				{lgDown ? (
					<IconButton
						color="inherit"
						aria-label="menu"
						onClick={() => dispatch(toggleMobileSidebar())}
					>
						<IconMenu2 />
					</IconButton>
				) : (
					""
				)}
				{/* ------------------------------------------- */}
				{/* Search Dropdown */}
				{/* ------------------------------------------- */}
				<Search />
				{lgUp ? <>{/* <Navigation /> */}</> : null}
				<Box flexGrow={1} />
				<Stack spacing={1} direction="row" alignItems="center">
					{/* <Language /> */}
					{/* ------------------------------------------- */}
					{/* Ecommerce Dropdown */}
					{/* ------------------------------------------- */}
					{/* <Cart /> */}
					<Notifications />
					<Profile />
				</Stack>
			</ToolbarStyled>
		</AppBarStyled>
	);
};

export default Header;
