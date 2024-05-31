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
  fetchCount: (
    site: string,
    company: string,
    fiscalYear: string,
    fromDate: string,
    toDate: string
  ) => void;
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
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");

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
          console.log(res.message);
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
  const handleFiscalYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedFiscalYear(event.target.value as string);

    const selectedFY = fiscalYears.find((fy) => fy.name === event.target.value);
    if (selectedFY) {
      setMinDate(selectedFY.year_start_date);
      setMaxDate(selectedFY.year_end_date);
    }
  };

  const handleToDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setSelectedToDate(formattedDate);
      fetchCount(
        selectedSite,
        selectedCompany,
        selectedFiscalYear,
        selectedFromDate,
        formattedDate
      );
    }
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
        <Box sx={{ width: "100%" }}>
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
              <FormControl sx={{ width: "11rem" }}>
                <InputLabel id="site-select-label">Site</InputLabel>
                <Select
                  labelId="site-select-label"
                  id="site-select"
                  value={selectedSite}
                  label="Site"
                  onChange={handleSiteChange}
                >
                  {sites.map((site, index) => (
                    <MenuItem
                      key={index}
                      value={site?.name}
                      sx={{
                        width: "11rem",
                      }}
                    >
                      {`${site.url} (${site.email})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
              <FormControl sx={{ width: "11rem" }}>
                <InputLabel
                  id="company-select-label"
                  disabled={companies.length === 0}
                >
                  Company
                </InputLabel>
                <Select
                  labelId="company-select-label"
                  id="company-select"
                  label="Company"
                  disabled={companies.length === 0}
                  onChange={handleCompanyChange}
                >
                  {companies.map((company, index) => (
                    <MenuItem
                      key={index}
                      value={company.name}
                      sx={{
                        width: "11rem",
                      }}
                    >
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
              <FormControl sx={{ width: "11rem" }}>
                <InputLabel
                  id="fiscal-year-select-label"
                  disabled={fiscalYears.length === 0}
                >
                  Fiscal Year
                </InputLabel>
                <Select
                  labelId="fiscal-year-select-label"
                  id="fiscal-year-select"
                  label="Fiscal Year"
                  disabled={fiscalYears.length === 0}
                  onChange={handleFiscalYearChange}
                >
                  {fiscalYears.map((fy, index) => (
                    <MenuItem
                      key={index}
                      value={fy.name}
                      sx={{
                        width: "11rem",
                      }}
                    >
                      {fy.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
              <FormControl sx={{ width: "11rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From Date"
                    value={selectedFromDate}
                    onChange={(date) =>
                      setSelectedFromDate(dayjs(date).format("YYYY-MM-DD"))
                    }
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                    disabled={selectedFiscalYear === ""}
                    minDate={minDate ? dayjs(minDate) : undefined}
                    maxDate={maxDate ? dayjs(maxDate) : undefined}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
              <FormControl sx={{ width: "11rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To Date"
                    value={selectedToDate}
                    onChange={handleToDateChange}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                    disabled={selectedFiscalYear === ""}
                    minDate={minDate ? dayjs(minDate) : undefined}
                    maxDate={maxDate ? dayjs(maxDate) : undefined}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {/* <Box sx={{ width: "15%" }}>
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
              <Button
                variant="contained"
                onClick={() =>
                  fetchCount(
                    selectedSite,
                    selectedCompany,
                    selectedFiscalYear,
                    selectedFromDate,
                    selectedToDate
                  )
                }
              >
                <span>Fetch</span>
                <ArrowForwardIosIcon
                  sx={{ paddingLeft: "0.1rem", fontSize: "small" }}
                />
              </Button>
            </Grid>
          </Grid>
        </Box> */}
      </Grid>
    </div>
  );
};

export default MyComponent;
