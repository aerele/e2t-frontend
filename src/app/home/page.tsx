"use client";
import React from 'react';
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Table from "../(DashboardLayout)/tables/search/page";
import { useEffect } from 'react'
import { useFrappePostCall, useFrappeAuth } from 'frappe-react-sdk'

const Home: React.FC = () => {
  const {currentUser, getUserCookie, error} = useFrappeAuth()
  const m = document.cookie.split(";").find((p) => p.trim().startsWith("user_image="));
  const { call } = useFrappePostCall("frappe.desk.page.setup_wizard.setup_wizard.load_user_details")
  useEffect(() => {
    get_data()
  },[])

  const get_data = () => {
    call({}).then((res) => console.log(res)).catch((err) => console.log(err))
  }
  console.log("cookie",m, currentUser);
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Header />
        <Table />
      </div>
    </div>
  );
};

export default Home;