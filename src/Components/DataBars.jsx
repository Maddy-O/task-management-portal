import React from "react";

const DataBars = ({ data, color }) => {
  return (
    <>
      <div style={{ width: "33%", boxShadow: "2px 2px 2px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 15px",
            backgroundColor: `${color}`,
            color: "white",
            height: "35px",
          }}
        >
          <div
            style={{
              textShadow: "2px 2px 2px  black",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Done
          </div>
        </div>
        <div>
          {data.map((e) => (
            <div
              key={e.id}
              style={{ border: "1px solid black", textAlign: "left" }}
            >
              <h5>{e.title}</h5>
              <p>{e.desc}</p>
              {/* <button onClick={() => moveToDo(e.id)}>To Do</button> */}
              <button>Done</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DataBars;
