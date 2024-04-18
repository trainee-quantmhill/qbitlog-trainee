import React from "react";
import { Typography, TextField, MenuItem, Grid } from "@mui/material";

const projects = [
  {
    value: "QBit Logs",
    label: "QBit Logs",
  },
  {
    value: "QBit Suite",
    label: "QBit Suite",
  },
  {
    value: "Ragnar",
    label: "Ragnar",
  },
];
const logTypes = [
  {
    value: "work",
    label: "Work",
  },
  {
    value: "office",
    label: "Office",
  },
  {
    value: "meeting",
    label: "Meeting",
  },
  {
    value: "leave",
    label: "Leave",
  },
];

const LogInputFields = ({
  logDate,
  hours,
  minutes,
  logType,
  project,
  logDescription,
  handleLogDateChange,
  handleHoursChange,
  handleMinutesChange,
  handleLogTypeChange,
  handleProjectChange,
  handleLogDescriptionChange,
}) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={12} md={4}>
        <Typography className="Input-Label" sx={{ my: 1 }}>
          Log Date
        </Typography>
        <TextField
          fullWidth
          id="log-date"
          type="date"
          variant="standard"
          autoComplete="off"
          value={logDate}
          onChange={handleLogDateChange}
          inputProps={{
            max: new Date().toISOString().split("T")[0],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography className="Input-Label" sx={{ my: 1 }}>
          Hours
        </Typography>
        <TextField
          select
          fullWidth
          id="hours"
          variant="standard"
          value={hours}
          onChange={handleHoursChange}
        >
          {[...Array(24).keys()].map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography className="Input-Label" sx={{ my: 1 }}>
          Minutes
        </Typography>
        <TextField
          select
          fullWidth
          id="minutes"
          variant="standard"
          value={minutes}
          onChange={handleMinutesChange}
        >
          {[...Array(60).keys()].map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography className="Input-Label" sx={{ my: 1 }}>
          Log Type
        </Typography>
        <TextField
          select
          fullWidth
          id="log-type"
          variant="standard"
          value={logType}
          onChange={handleLogTypeChange}
        >
          {logTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography className="Input-Label" sx={{ my: 1 }}>
          Project
        </Typography>
        <TextField
          select
          fullWidth
          id="project"
          variant="standard"
          value={project}
          onChange={handleProjectChange}
        >
          {projects.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}{" "}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Typography className="Input-Label" sx={{ my: 1 }}>
          Log Description
        </Typography>
        <TextField
          fullWidth
          id="log-description"
          multiline
          rows={2}
          variant="standard"
          value={logDescription}
          onChange={handleLogDescriptionChange}
        />
      </Grid>
    </Grid>
  );
};

export default LogInputFields;
