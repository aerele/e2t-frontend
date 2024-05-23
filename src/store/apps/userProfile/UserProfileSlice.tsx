import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { useFrappePostCall, useFrappeAuth } from "frappe-react-sdk";

interface StateType {
	fullname: string;
	email: string;
	image: string;
	timezone: string;
}

const initialState = {
	fullname: null,
	email: null,
	image: null,
	timezone: null,
};

export const UserProfileSlice = createSlice({
	name: "UserDetails",
	initialState,
	reducers: {
		setFullname: (state, action) => {
			state.fullname = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setImage: (state, action) => {
			state.image = action.payload;
		},
		setTimezone: (state, action) => {
			state.timezone = action.payload;
		},
	},
});

export const { setFullname, setEmail, setImage, setTimezone } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
