import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { Stack, Snackbar, MenuItem, Select } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import CreateMaterie from "./CreateMaterie.component.jsx";
import { width } from "@mui/system";

import AsociateStudents from "./AsociateStudent.component.jsx";

const MaterieList = () => {
  const [materii, setMaterii] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchMaterii = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/materii/");
        setMaterii(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Eroare la obținerea datelor:", error);
        setError("Eroare la obținerea datelor");
      }
    };

    fetchMaterii();
  }, []);

  const handleCloseSnackbar = () => {
    setError(null);
  };
  const handleStudentChange = (event) => {
    const studentId = event.target.value;
    const selectedStudent = materii.flatMap((materie) =>
      materie.studenti.find((student) => student.id === studentId)
    );
    setSelectedStudent(selectedStudent);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Numele Materiei", width: 200 },
    { field: "description", headerName: "Descriere", width: 200 },
    { field: "anLicenta", headerName: "An Licenta", width: 150 },
    {
      field: "students",
      headerName: "Studenți",
      width: 200,
      renderCell: (params) => (
        <div style={{ height: "auto", width: 200, margin: "auto" }}>
          <Select
            value={selectedStudent ? selectedStudent.id : ""}
            onChange={handleStudentChange}
          >
            {params.row.studenti.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.nume} {student.prenume}
                Nota: {student.nota}
              </MenuItem>
            ))}
          </Select>
        </div>
      ),
    },
    {
      field: "add",
      headerName: "Asociaza Studenti",
      width: 400,
      sortable: false,
      filterable: false,
      renderCell: (row) => <AsociateStudents materie={row.row} />,
    },
  ];

  console.log(materii);

  const handleMaterieCreated = (newMaterie) => {
    setMaterii([...materii, newMaterie]);
  };

  return (
    <div>
      <h2>Listă de Materii:</h2>
      <Stack direction="row" justifyContent="flex-end" marginBottom={2}>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={handleCloseSnackbar}
          >
            {error}
          </MuiAlert>
        </Snackbar>
      </Stack>
      <div style={{ height: 400, width: "80%", margin: "auto" }}>
        {/* <Stack mt={2} mb={2}>
            <AddMaterie />
          </Stack> */}
        <DataGrid
          rows={materii}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          components={{ Toolbar: CustomToolbar }}
        />
        {/* <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message=""
        /> */}
        <CreateMaterie onMaterieCreated={handleMaterieCreated} />
      </div>
    </div>
  );
};

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default MaterieList;
