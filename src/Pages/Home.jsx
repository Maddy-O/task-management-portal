import React, { useState } from "react";
import tasks from "../Assets/tasks.png";
import uuid from "react-uuid";
import DataBars from "../Components/DataBars";
import TaskCard from "../Components/TaskCard";

const Home = () => {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [title, setTile] = useState("");
  const [desc, setDesc] = useState("");
  const [todoData, setTodoData] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );
  const [doingData, setDoingData] = useState(
    JSON.parse(localStorage.getItem("doing")) || []
  );
  const [doneData, setDoneData] = useState(
    JSON.parse(localStorage.getItem("done")) || []
  );

  // ---------------------ADD TASK------------------------------------------
  const addTask = () => {
    const id = uuid();
    let newTask = { id, title, desc };
    todoData.push(newTask);
    localStorage.setItem("todo", JSON.stringify(todoData));
    setDisplayAdd(!displayAdd);
    console.log(todoData);
  };

  // ---------------------MOVING TASK TO DOING------------------------------------------
  const moveToDoing = (e) => {
    let a = todoData.filter((item) => item.id === e);
    let b = todoData.filter((item) => item.id !== e);
    localStorage.removeItem("todo");
    setTodoData(localStorage.setItem("todo", JSON.stringify(b)) || []);
    localStorage.setItem("todo", JSON.stringify(b));
    let newTask = a[0];
    doingData.push(newTask);
    localStorage.setItem("doing", JSON.stringify(doingData));
    console.log("b", b);
  };

  // ---------------------MOVING TASK TO TODO------------------------------------------
  const moveToDo = (e) => {
    let a = doingData.filter((item) => item.id === e);
    let b = doingData.filter((item) => item.id !== e);
    localStorage.removeItem("doing");
    setDoingData(localStorage.setItem("doing", JSON.stringify(b)) || []);
    localStorage.setItem("doing", JSON.stringify(b));
    let newTask = a[0];
    todoData.push(newTask);
    localStorage.setItem("todo", JSON.stringify(todoData));
  };

  // ---------------------MOVING TASK TO DONE------------------------------------------
  const moveToDone = (e) => {
    let a = doingData.filter((item) => item.id === e);
    let b = doingData.filter((item) => item.id !== e);
    localStorage.removeItem("doing");
    setDoingData(localStorage.setItem("doing", JSON.stringify(b)) || []);
    localStorage.setItem("doing", JSON.stringify(b));
    let newTask = a[0];
    doneData.push(newTask);
    localStorage.setItem("done", JSON.stringify(doneData));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
          gap: "10px",
          padding: "0px 10px",
        }}
      >
        {/* -----------------------------To-Do-------------------------------- */}
        <div style={{ width: "33%", boxShadow: "2px 2px 2px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 15px",
              backgroundColor: "#ff5000",
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
              To Do
            </div>
            <button
              style={{
                backgroundColor: "#00afef",
                border: "none",
                color: "white",
                padding: "5px 10px",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "20px",
                boxShadow: "2px 2px 2px black",
              }}
              onClick={() => setDisplayAdd(!displayAdd)}
            >
              +
            </button>
          </div>
          <div
            style={
              displayAdd
                ? {
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    gap: "5px",
                  }
                : { display: "none" }
            }
          >
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTile(e.target.value)}
              style={{ padding: "7px" }}
            />
            <input
              placeholder="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ padding: "7px" }}
            />
            <button
              onClick={addTask}
              style={{
                padding: "7px",
                backgroundColor: "#00afef",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add Task
            </button>
          </div>
          <div style={displayAdd ? { display: "none" } : {}}>
            {todoData.map((e, index) => (
              <TaskCard
                draggable
                key={e.id}
                data={e}
                func1={moveToDoing}
                func2={""}
                btn1={"Doing"}
                btn2={"Done"}
              />
            ))}
          </div>
        </div>
        {/* -----------------------------Doing-------------------------------- */}
        <div style={{ width: "33%", boxShadow: "2px 2px 2px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 15px",
              backgroundColor: "#ffc300",
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
              Doing
            </div>
          </div>
          <div>
            {doingData.map((e) => (
              <TaskCard
                draggable
                key={e.id}
                data={e}
                func1={moveToDo}
                func2={moveToDone}
                btn1={"To Do"}
                btn2={"Done"}
              />
            ))}
          </div>
        </div>
        {/* -----------------------------Done-------------------------------- */}
        <DataBars data={doneData} color={"#629871"} displayAdd={displayAdd} />
      </div>
    </>
  );
};

export default Home;
