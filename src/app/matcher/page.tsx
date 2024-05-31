"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import E2tmapping from "../(DashboardLayout)/tables/e2tmapping/page";
import { useSearchParams } from "next/navigation";
import { useFrappePostCall } from "frappe-react-sdk";
import { Toaster, toast } from "sonner";



interface itemListProps {
	name: string;
}


const Matcher: React.FC = () => {
    const searchParams = useSearchParams();
	const [accountList, setAccoutList] = useState<itemListProps[]>([])
    const site = searchParams.get('site');
    const company = searchParams.get('company');


    const { call: getAccountList } = useFrappePostCall("e2t_backend.api.export_details.get_account_list");

    useEffect(() => {
        if (site) {
            getAccountList({ site, company })
			.then((res) => setAccoutList(res.message))
			.catch((err) => toast.error("Unable fetch date"));
        }
    }, [site, getAccountList]);


    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1, overflowY: "auto" }}>
                <Header />
                <E2tmapping AccountList={accountList}/>
            </div>
        </div>
    );
};

export default Matcher;
