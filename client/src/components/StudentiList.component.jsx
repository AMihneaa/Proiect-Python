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

import AddStudent from "../components/CreateStudenti.component.jsx";
import { width } from "@mui/system";

const StudentiList = () => {
  const [materii, setMaterii] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchMaterii = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/students/");
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

  const addStudents = () => {};

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nume", headerName: "Nume", width: 200 },
    { field: "prenume", headerName: "Prenume", width: 200 },
    { field: "nota", headerName: "Nota", width: 150 },
    {field: "serie", headerName:"Seria", width: 100},
  ];

  console.log(materii);

  const handleMaterieCreated = (newMaterie) => {
    setMaterii([...materii, newMaterie]);
  };

  const divStyle = {
    backgroundColor: '#fff  ff', // Codul de culoare pentru alb
    // Alte stiluri în linie adăugate dacă este necesar
    padding: '10px',
    border: '1px solid #ccc',
  };

  return (
    <div style={{    textAlign: 'center',  marginBottom: "20px"}}>
      <h2 style={{color: "white", margin: "30px", paddingTop: "50px", fontSize: "30px"}}>Listă de Studenti:</h2>
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
      <div style={{ height: 400, width: "80%", margin: "auto", background: "white" }}>
        {/* <Stack mt={2} mb={2}>
            <AddMaterie />
          </Stack> */}
        <DataGrid
          rows={materii}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
        />
        {/* <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message=""
        /> */}
        <AddStudent onMaterieCreated={handleMaterieCreated} />
      </div>
    </div>
  );
};

export default StudentiList;
