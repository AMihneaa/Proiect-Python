// AsociateStudents.component.jsx

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";

const AsociateStudents = ({ materie }) => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentIdInput, setStudentIdInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    handleClose();
  };

  const handleInputChange = (event) => {
    setStudentIdInput(event.target.value);
  };

  const handleDoneClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/materii/${materie.id}/update-students/`,
        { student_id: studentIdInput }
      );
      // Aici poți face orice alte acțiuni necesare după request (afișarea unui mesaj de succes, actualizarea datelor, etc.)
      console.log("Request cu succes:", response.data);
    } catch (error) {
      // Aici poți trata erorile, afișa un mesaj de eroare, etc.
      console.error("Eroare la request:", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Asociaza Studenti
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Asociază Studenti</DialogTitle>
        <DialogContent>
          <List>
            {materie.studenti.map((student) => (
              <ListItem
                button
                key={student.id}
                onClick={() => handleStudentClick(student)}
              >
                <ListItemText primary={`${student.nume} ${student.prenume}`} />
              </ListItem>
            ))}
          </List>
          <TextField
            label="Introdu ID-ul studentului"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuleaza</Button>
          <Button onClick={handleDoneClick} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AsociateStudents;
