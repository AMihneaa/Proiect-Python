import React, { useState } from "react";
import axios from "axios";
import { styled, Button, TextField } from "@mui/material";

const PinkContainer = styled("div")({
  backgroundColor: "#ff69b4", // Roz
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
});

const PinkButton = styled(Button)({
  backgroundColor: "#ff69b4", // Roz
  color: "#fff", // Text alb
  "&:hover": {
    backgroundColor: "#e0458d", // Nuanță roz mai închisă la hover
  },
});

const AddStudent = ({ onStudentAdded }) => {
  const [studentData, setStudentData] = useState({
    nume: "",
    prenume: "",
    serie: "",
    nota: 0,
  });

  const handleInputChange = (field) => (event) => {
    setStudentData({
      ...studentData,
      [field]: event.target.value,
    });
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/students/create/",
        studentData
      );
      onStudentAdded(response.data);
      setStudentData({
        nume: "",
        prenume: "",
        serie: "",
        nota: 0,
      });
    } catch (error) {
      console.error("Eroare la adăugarea studentului:", error);
    }
  };

  return (
    <PinkContainer>
      <h3 style={{ color: "#fff" }}>Adaugă Student Nou:</h3>
      <TextField
        label="Nume"
        value={studentData.nume}
        onChange={handleInputChange("nume")}
        margin="normal"
        fullWidth
        variant="outlined"
        style={{ marginBottom: "10px" }}
        InputProps={{ style: { backgroundColor: "#fff" } }}
      />
      <TextField
        label="Prenume"
        value={studentData.prenume}
        onChange={handleInputChange("prenume")}
        margin="normal"
        fullWidth
        variant="outlined"
        style={{ marginBottom: "10px" }}
        InputProps={{ style: { backgroundColor: "#fff" } }}
      />
      <TextField
        label="Serie"
        value={studentData.serie}
        onChange={handleInputChange("serie")}
        margin="normal"
        fullWidth
        variant="outlined"
        style={{ marginBottom: "10px" }}
        InputProps={{ style: { backgroundColor: "#fff" } }}
      />
      <TextField
        label="Nota"
        type="number"
        value={studentData.nota}
        onChange={handleInputChange("nota")}
        margin="normal"
        fullWidth
        variant="outlined"
        style={{ marginBottom: "10px" }}
        InputProps={{ style: { backgroundColor: "#fff" } }}
      />
      <PinkButton variant="contained" onClick={handleAddStudent}>
        Adaugă Student
      </PinkButton>
    </PinkContainer>
  );
};

export default AddStudent;
