import React from "react";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#0188a8",
        color: "#c0c0c1",
        padding: "15px 25px",
      }}
    >
      <p
        style={{
          margin: "0px",
          fontSize: "35px",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
        }}
      >
        Get - Set - Go
      </p>
      <p
        style={{
          margin: "0px",
          fontSize: "35px",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
        }}
      >
        User
      </p>
    </div>
  );
};

export default Navbar;
