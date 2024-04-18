import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const LogTable = ({ logs, handleDeleteLog, handleEditLog }) => {
  return (
    <TableContainer >
      <Table> 
        <TableHead style={{ whiteSpace: "nowrap"}}>
          <TableRow>
            <TableCell sx={{ color: "#858BC5", textAlign: "center"  }}> Log Date</TableCell>
            <TableCell sx={{ color: "#858BC5", textAlign: "center"  }}>Hours</TableCell>
            <TableCell sx={{ color: "#858BC5" , textAlign: "center" }}>Minutes</TableCell>
            <TableCell sx={{ color: "#858BC5" , textAlign: "center" }}>Log Type</TableCell>
            <TableCell sx={{ color: "#858BC5" , textAlign: "center" }}>Project</TableCell>
            <TableCell sx={{ color: "#858BC5", textAlign: "center"  }}> Log Description</TableCell>
            <TableCell sx={{ color: "#858BC5" , textAlign: "center" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ whiteSpace: "nowrap"}}>
          {logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: "#fff", textAlign: "center"  }}>{log.logDate}</TableCell>
              <TableCell sx={{ color: "#fff" , textAlign: "center" }}>{log.hours}</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center"  }}>{log.minutes}</TableCell>
              <TableCell sx={{ color: "#fff" , textAlign: "center" }}>{log.logType}</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center"  }}>{log.project}</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center"  }}>
                {log.logDescription}
              </TableCell>
              <TableCell sx={{textAlign: "center"}}>
                <IconButton
                  sx={{ color: "white",}}
                  onClick={() => handleDeleteLog(index)}
                  onMouseOver={(e) => (e.currentTarget.style.color = "red")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "white", marginLeft: "15px" }}
                  onClick={() => handleEditLog(index)}
                  onMouseOver={(e) => (e.currentTarget.style.color = "green")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogTable;
