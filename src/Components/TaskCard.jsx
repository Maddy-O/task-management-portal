import React from "react";

const TaskCard = ({ data, func1, func2, btn1, btn2 }) => {
  return (
    <>
      <div
        draggable
        onDragStart={() => console.log("start")}
        onDragEnd={() => console.log("end")}
        style={{
          textAlign: "left",
          padding: "15px",
          margin: "10px",
          borderRadius: "10px",
          boxShadow: "1px 1px 3px 2px black",
        }}
      >
        <h5 style={{ margin: "0px" }}>{data.title}</h5>
        <p style={{ margin: "10px 0px" }}>{data.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            style={{
              backgroundColor: "#00afef",
              border: "none",
              color: "white",
              padding: "5px 15px",
              fontSize: "15px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px black",
              cursor: "pointer",
            }}
            onClick={() => func1(data.id)}
          >
            {btn1}
          </button>
          <button
            style={{
              backgroundColor: "#00afef",
              border: "none",
              color: "white",
              padding: "5px 15px",
              fontSize: "15px",
              borderRadius: "10px",
              boxShadow: "2px 2px 2px black",
              cursor: "pointer",
            }}
            onClick={() => func2(data.id)}
          >
            {btn2}
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
