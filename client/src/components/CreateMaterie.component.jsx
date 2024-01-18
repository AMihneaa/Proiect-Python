import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, styled } from "@mui/material";

const StyledCreateMaterie = styled("div")({
  padding: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginBottom: "16px",
  "& h3": {
    marginBottom: "16px",
  },
  "& .MuiTextField-root": {
    width: "100%",
    marginBottom: "16px",
  },
  "& .MuiButton-root": {
    width: "100%",
  },
});

const CreateMaterie = ({ onMaterieCreated }) => {
  const [materieData, setMaterieData] = useState({
    name: "",
    description: "",
    anLicenta: "",
  });

  const handleInputChange = (field) => (event) => {
    setMaterieData({
      ...materieData,
      [field]: event.target.value,
    });
  };

  const handleCreateMaterie = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/materii/",
        materieData
      );
      onMaterieCreated(response.data);
      setMaterieData({
        name: "",
        description: "",
        anLicenta: "",
      });
    } catch (error) {
      console.error("Eroare la crearea materiei:", error);
    }
  };

  return (
    <StyledCreateMaterie>
      <h3>Adaugă Materie Nouă:</h3>
      <TextField
        label="Nume"
        value={materieData.name}
        onChange={handleInputChange("name")}
        variant="outlined"
        size="small"
      />
      <TextField
        label="Descriere"
        value={materieData.description}
        onChange={handleInputChange("description")}
        variant="outlined"
        size="small"
      />
      <TextField
        label="An Licenta"
        value={materieData.anLicenta}
        onChange={handleInputChange("anLicenta")}
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleCreateMaterie}>
        Adaugă Materie
      </Button>
    </StyledCreateMaterie>
  );
};

export default CreateMaterie;
