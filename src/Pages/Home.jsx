import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";

const Home = () => {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [title, setTile] = useState("");
  const [desc, setDesc] = useState("");
  const [dragging, setDragging] = useState(false);
  const placeToDragItem = useRef();
  const dragItem = useRef();
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
    // console.log(todoData);
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

  // ---------------------HANDLE DRAG START------------------------------------------

  const handleDragStart = (e, prop) => {
    dragItem.current = prop.data;
    setDragging(true);
  };

  const handleDragEnter = (e, prop) => {
    placeToDragItem.current = prop.place;
  };

  const handleDragEnd = (e, prop) => {
    let dragFrom = [];
    let setDragFrom;
    if (prop.place === "todo") {
      dragFrom = todoData;
      setDragFrom = setTodoData;
    } else if (prop.place === "doing") {
      dragFrom = doingData;
      setDragFrom = setDoingData;
    } else if (prop.place === "done") {
      dragFrom = doneData;
      setDragFrom = setDoneData;
    }
    if (placeToDragItem.current === "doing") {
      let a = doingData.filter((item) => item.id === dragItem.current.id);
      if (a?.length !== 1) {
        let b = dragFrom.filter((item) => item.id !== dragItem.current.id);
        localStorage.removeItem(prop.place);
        setDragFrom(localStorage.setItem(prop.place, JSON.stringify(b)) || []);
        localStorage.setItem(prop.place, JSON.stringify(b));
        doingData.push(dragItem.current);
        localStorage.setItem("doing", JSON.stringify(doingData));
      }
    } else if (placeToDragItem.current === "done") {
      let a = doneData.filter((item) => item.id === dragItem.current.id);
      if (a?.length !== 1) {
        let b = dragFrom.filter((item) => item.id !== dragItem.current.id);
        localStorage.removeItem(prop.place);
        setDragFrom(localStorage.setItem(prop.place, JSON.stringify(b)) || []);
        localStorage.setItem(prop.place, JSON.stringify(b));
        doneData.push(dragItem.current);
        localStorage.setItem("done", JSON.stringify(doneData));
      }
    } else if (placeToDragItem.current === "todo") {
      let a = todoData.filter((item) => item.id === dragItem.current.id);
      if (a?.length !== 1) {
        let b = dragFrom.filter((item) => item.id !== dragItem.current.id);
        localStorage.removeItem(prop.place);
        setDragFrom(localStorage.setItem(prop.place, JSON.stringify(b)) || []);
        localStorage.setItem(prop.place, JSON.stringify(b));
        todoData.push(dragItem.current);
        localStorage.setItem("todo", JSON.stringify(todoData));
      }
    }
    setDragging(false);
  };

  useEffect(() => {
    setTodoData(JSON.parse(localStorage.getItem("todo")) || []);
    setDoingData(JSON.parse(localStorage.getItem("doing")) || []);
    setDoneData(JSON.parse(localStorage.getItem("done")) || []);
  }, [setDoingData, setDoneData, setTodoData, setDragging]);

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
        <div
          className="task-bar"
          onDragEnter={
            dragging ? (ele) => handleDragEnter(ele, { place: "todo" }) : null
          }
          onDragEnd={(ele) => handleDragEnd(ele, { place: "todo" })}
        >
          <div
            className="task-bar-heading"
            style={{ backgroundColor: "#ff5000" }}
          >
            <div>To Do</div>
            <button onClick={() => setDisplayAdd(!displayAdd)}>+</button>
          </div>
          <div
            className="addTask"
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
            />
            <input
              placeholder="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
          <div style={displayAdd ? { display: "none" } : {}}>
            {todoData.map((e, index) => (
              <div
                key={e.id}
                draggable
                onDragStart={(ele) =>
                  handleDragStart(ele, { place: "to do", data: e })
                }
                className="task-card"
              >
                <h5 style={{ margin: "0px" }}>{e.title}</h5>
                <p style={{ margin: "10px 0px" }}>{e.desc}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button
                    className="task-card-button"
                    onClick={() => moveToDoing(e.id)}
                  >
                    Doing
                  </button>
                  <button
                    className="task-card-button"
                    onClick={() => moveToDone(e.id)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -----------------------------Doing-------------------------------- */}
        <div
          className="task-bar"
          onDragEnter={
            dragging ? (ele) => handleDragEnter(ele, { place: "doing" }) : null
          }
          onDragEnd={(ele) => handleDragEnd(ele, { place: "doing" })}
        >
          <div className="task-bar-heading">
            <div>Doing</div>
          </div>
          <div>
            {doingData.map((e, index) => (
              <div
                key={e.id}
                draggable
                onDragStart={(ele) =>
                  handleDragStart(ele, { place: "doing", data: e })
                }
                className="task-card"
              >
                <h5 style={{ margin: "0px" }}>{e.title}</h5>
                <p style={{ margin: "10px 0px" }}>{e.desc}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button
                    className="task-card-button"
                    onClick={() => moveToDo(e.id)}
                  >
                    To Do
                  </button>
                  <button
                    className="task-card-button"
                    onClick={() => moveToDone(e.id)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -----------------------------Done-------------------------------- */}
        <div
          className="task-bar"
          onDragEnter={
            dragging ? (ele) => handleDragEnter(ele, { place: "done" }) : null
          }
          onDragEnd={(ele) => handleDragEnd(ele, { place: "done" })}
        >
          <div
            className="task-bar-heading"
            style={{ backgroundColor: "#60956f" }}
          >
            <div>Done</div>
          </div>
          <div>
            {doneData.map((e, index) => (
              <div
                key={e.id}
                draggable
                onDragStart={(ele) =>
                  handleDragStart(ele, { place: "done", data: e })
                }
                className="task-card"
              >
                <h5 style={{ margin: "0px" }}>{e.title}</h5>
                <p style={{ margin: "10px 0px" }}>{e.desc}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <button
                    className="task-card-button"
                    onClick={() => moveToDo(e.id)}
                  >
                    Doing
                  </button>
                  <button
                    className="task-card-button"
                    onClick={() => moveToDone(e.id)}
                  >
                    To Do
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
