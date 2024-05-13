"use client";
import React from 'react';
import Sidebar from "@/app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "@/app/(DashboardLayout)/layout/horizontal/header/Header";
import Table from "../(DashboardLayout)/connected_site/page"
import { useFrappePostCall } from 'frappe-react-sdk'
import {useEffect} from 'react'

export default function Dashboard(){  
  const m = document.cookie.split(";").find((p) => p.trim().startsWith("user_id="));
  const { call } = useFrappePostCall("frappe.desk.page.setup_wizard.setup_wizard.load_user_details")
  useEffect(() => {
    get_data()
  },[])

  const get_data = () => {
    call({}).then((res) => console.log(res)).catch((err) => console.log(err))
  }
  console.log("cookie",m);
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* <Sidebar /> */}
      <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '2px' }}>
        {/* <Header /> */}
        <Table />
      </div>
    </div>
  );
};
