import React from "react";
import tasks from "../Assets/tasks.png";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#0188a8",
        color: "#c0c0c1",
        padding: "10px 25px",
        height: "40px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={tasks} alt="#" height="100%" />
        <p
          style={{
            margin: "0px",
            fontSize: "25px",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            textShadow: "5px 5px 5px black",
          }}
        >
          Get - Set - Go
        </p>
      </div>
    </div>
  );
};

export default Navbar;
