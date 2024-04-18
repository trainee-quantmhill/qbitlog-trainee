import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  MenuItem,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

function AllLogs({ logs }) {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    year: "",
    month: "",
    week: "",
    date: "",
  });

  const years = [new Date().getFullYear()];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getWeeksOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysAfterFirstWeek = daysInMonth - (7 - firstDay);
    const weeks = Math.ceil(daysAfterFirstWeek / 7) + 1;
    return Array.from({ length: weeks }, (_, index) => index + 1);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    setSubmitEnabled(updatedFilter.year !== "" || updatedFilter.date !== "");
    const isClearEnabled = Object.values(updatedFilter).some(
      (value) => value !== ""
    );
    setClearEnabled(isClearEnabled);
  };

  const clearFilters = () => {
    setFilter({
      year: "",
      month: "",
      week: "",
      date: "",
    });
    setSubmitEnabled(false);
    setClearEnabled(false);
  };

  const filteredLogs = logs
    ? logs.filter((log) => {
        if (filter.year && log.year !== filter.year) return false;
        if (filter.month && log.month !== filter.month) return false;
        if (filter.week && log.week !== filter.week) return false;
        if (filter.date && log.date !== filter.date) return false;
        return true;
      })
    : [];

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [clearEnabled, setClearEnabled] = useState(false);

  const weeks = getWeeksOfMonth(filter.year, months.indexOf(filter.month));
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Box
       className="Inner-Box-Layout"
      >
        <Grid container spacing={8}>
          {/* Year */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Select Year
            </Typography>
            <TextField
              name="year"
              select
              fullWidth
              value={filter.year}
              onChange={handleFilterChange}
              variant="standard"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Month */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Select Month
            </Typography>
            <TextField
              name="month"
              select
              fullWidth
              value={filter.month}
              onChange={handleFilterChange}
              variant="standard"
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Week */}
          <Grid item sm={6} xs={12} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Select Week
            </Typography>
            <TextField
              name="week"
              select
              fullWidth
              value={filter.week}
              onChange={handleFilterChange}
              variant="standard"
            >
              {weeks.map((week) => (
                <MenuItem key={week} value={week}>
                  Week {week}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Date */}
          <Grid item sm={6} xs={12} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Select Date
            </Typography>
            <TextField
              name="date"
              fullWidth
              type="date"
              variant="standard"
              value={filter.date}
              onChange={handleFilterChange}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "50px",
                bgcolor: "#858BC5",
                color: "#ffffff",
                marginRight: "8px",
                width: "100%",
              }}
              disabled={!submitEnabled}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            {/* Clear Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "50px",
                bgcolor: "#858BC5",
                color: "#ffffff",

                width: "100%",
              }}
              onClick={clearFilters}
              disabled={!clearEnabled}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Table */}
      <Box
       className="Inner-Box-Layout" mt={6}
      >
        <TableContainer>
          <Table>
            <TableHead></TableHead>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <TableRow key={index}></TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ color: "white" }} colSpan={7}>
                    No logs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>


      </Box>
    </div>
  );
}

export default AllLogs;
