'use client'

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
interface Column {
    id: 'erpnext_account' | 'tally_account';
    label: string;
    minWidth: string;
}

interface AccountMapping {
    [key: string]: string;
}

const columns: Column[] = [
    { id: 'erpnext_account', label: 'ErpNext Account', minWidth: '50%' },
    { id: 'tally_account', label: 'Tally Account', minWidth: '70%' },
];

const tally_accounts: string[] = [
    "Assets",
    "Current Assets",
    "Bank Accounts",
    "Cash-in-Hand",
    "Deposits (Asset)",
    "Loans & Advances (Asset)",
    "Stock-in-Hand",
    "Sundry Debtors",
    "Fixed Assets",
    "Investments",
    "Misc. Expenses (ASSET)",
    "Liabilities",
    "Branch / Divisions",
    "Capital Account",
    "Reserves & Surplus",
    "Current Liabilities",
    "Duties & Taxes",
    "Provisions",
    "Sundry Creditors",
    "Loans (Liability)",
    "Bank OD A/c",
    "Secured Loans",
    "Unsecured Loans",
    "Suspense A/c",
    "Expenses",
    "Direct Expenses",
    "Indirect Expenses",
    "Purchase Accounts",
    "Income",
    "Direct Incomes",
    "Indirect Incomes",
    "Sales Accounts"
];

interface FetchAccount {
    AccountList: { name: string }[];
}

const Editsite: React.FC<FetchAccount> = ({ AccountList }) => {
    const [accountMapping, setAccountMapping] = useState<AccountMapping>({});
    const [erpnext_accounts, setErpnextAccounts] = useState<string[]>([]);
    const [datalist, setDatalist] = useState<AccountMapping[]>([]);

    useEffect(() => {
        const erpnextAccounts = AccountList.map(account => account.name);
        setErpnextAccounts(erpnextAccounts);
    }, [AccountList]);

    const handleChange = (event: SelectChangeEvent<string>, erpnext_account: string) => {
        const newMapping = {
            ...accountMapping,
            [erpnext_account]: event.target.value,
        };
        setAccountMapping(newMapping);
        setDatalist(Object.entries(newMapping).map(([key, value]) => ({ [key]: value })));
    };

    return (
        <Box>
            <Box
                sx={{
                    border:'1px solid #dadada',
                }}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding:'2rem'
                }}>
                    <TableContainer
                        sx={{
                            maxHeight: 440,
                            maxWidth: '100%',
                            border: '1px solid #e7e7e7',
                            "&::-webkit-scrollbar": {
                                width: "1px",
                                height: "2px"
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "rgba(0, 0, 0, 0.2)",
                                borderRadius: "4px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                background: "rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow sx={{"& th": {
                                        color: "rgba(96, 96, 96)",
                                        backgroundColor: "#f3f3f3"
                                    }}}>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <Typography variant="h6" fontWeight="500" sx={{ textAlign: "center" }}>
                                                {column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {erpnext_accounts.map((erpnext_account, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight="500" sx={{paddingLeft:"2rem"}}>
                                                {erpnext_account}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ alignContent: "center", alignItems: 'center', paddingLeft: "12rem" }}>
                                            <Select
                                                value={accountMapping[erpnext_account] || ""}
                                                onChange={(event) => handleChange(event, erpnext_account)}
                                                sx={{ width: "15rem" }}
                                            >
                                                {tally_accounts.map((tally_account, idx) => (
                                                    <MenuItem key={idx} value={tally_account} sx={{ width: "3rem" }}>
                                                        {tally_account}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default Editsite;
