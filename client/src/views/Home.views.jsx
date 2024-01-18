// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Home Page</h2>
      <Link to="/students">
        <button style={styles.buttonPink}>Students</button>
      </Link>
      <Link to="/courses">
        <button style={styles.buttonBlue}>Courses</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#FFD6E7", // Roz predominant
  },
  heading: {
    color: "#FF006E", // Roz închis pentru titlu
  },
  buttonPink: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#FF006E", // Roz închis pentru butoane
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonBlue: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#6FA1FF", // Albastru deschis pal pentru butoane
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
