// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div style={styles.container}>
      <h2>Home Page</h2>
      <Link to="/students">
        <button style={styles.button}>Students</button>
      </Link>
      <Link to="/courses">
        <button style={styles.button}>Courses</button>
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
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
