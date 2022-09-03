import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";

const Home = () => {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [displayAlert, setDisplyAlert] = useState(false);
  const [title, setTile] = useState("");
  const [desc, setDesc] = useState("");
  const [attach, setAttach] = useState("");
  const [asign, setAsign] = useState("");
  const [search, setSearch] = useState("");
  const [addComm, setAddComment] = useState("");
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
    let newTask = { id, title, desc, attach, asign };
    todoData.push(newTask);
    localStorage.setItem("todo", JSON.stringify(todoData));
    setDisplayAdd(!displayAdd);
  };

  // ---------------------ADD Comment------------------------------------------
  const addComment = () => {
    const { id, title, desc, attach, asign } = dragItem.current;
    console.log(dragItem.current);
    let addedCom = {
      id: id,
      title: title,
      desc: desc,
      attach: attach,
      asign: asign,
      comment: addComm,
    };
    doneData.push(addedCom);
    localStorage.setItem("done", JSON.stringify(doneData));
    setDisplyAlert(false);
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
        alert("add commetn");
        setDisplyAlert(true);
        // doneData.push(dragItem.current);
        // localStorage.setItem("done", JSON.stringify(doneData));
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
  }, [setDoingData, setDoneData, setTodoData, setDragging, setDisplyAlert]);

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
            <div>Not Started</div>
            <button onClick={() => setDisplayAdd(!displayAdd)}>+</button>
          </div>
          <div style={displayAdd ? { display: "none" } : { padding: "7px" }}>
            <input
              placeholder="Search new tasks"
              style={{ padding: "7px", width: "95%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
              type="text"
              value={title}
              onChange={(e) => setTile(e.target.value)}
            />
            <input
              placeholder="desc"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              placeholder="Attachement"
              type="file"
              value={attach}
              onChange={(e) => setAttach(e.target.value)}
            />
            <select
              placeholder="Asign to"
              value={asign}
              onChange={(e) => setAsign(e.target.value)}
            >
              <option value={"Madan"}>Madan</option>
              <option value={"Maddy"}>Maddy</option>
              <option value={"Mohan"}>Mohan</option>
            </select>
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
                <h4 style={{ margin: "0px" }}>{e.title}</h4>
                <p style={{ margin: "10px 0px" }}>
                  {" "}
                  <b>File : </b>
                  {e.attach}
                </p>
                <p style={{ margin: "5px 0px" }}>
                  <b>Description : </b>
                  {e.desc}
                </p>
                <p>
                  {" "}
                  <b>Asign : </b> {e.asign}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                ></div>
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
            <div>In Development</div>
          </div>
          <div style={{ padding: "7px" }}>
            <input
              placeholder="search on-going tasks"
              style={{ padding: "7px", width: "95%" }}
            />
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
                <h4 style={{ margin: "0px" }}>{e.title}</h4>
                <p style={{ margin: "10px 0px" }}>
                  {" "}
                  <b>File : </b>
                  {e.attach}
                </p>
                <p style={{ margin: "5px 0px" }}>
                  <b>Description : </b>
                  {e.desc}
                </p>
                <p>
                  {" "}
                  <b>Asign : </b> {e.asign}
                </p>
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
            <div>Completed</div>
          </div>
          <div style={{ padding: "7px" }}>
            <input
              placeholder="search completed tasks"
              style={{ padding: "7px", width: "95%" }}
            />
          </div>
          <div
            className="addTask"
            style={
              displayAlert
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
              placeholder="Add Comment"
              value={addComm}
              onChange={(e) => setAddComment(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
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
                <h4 style={{ margin: "0px" }}>{e.title}</h4>
                <p style={{ margin: "10px 0px" }}>
                  {" "}
                  <b>File : </b>
                  {e.attach}
                </p>
                <p style={{ margin: "5px 0px" }}>
                  <b>Description : </b>
                  {e.desc}
                </p>
                <p>
                  {" "}
                  <b>Asign : </b> {e.asign}
                </p>
                <div className="tool-tip">
                  comment
                  <p className="tool-tip-text">{e.comment}</p>
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

// ---------------------MOVING TASK TO DOING------------------------------------------
// const moveToDoing = (e) => {
//   let a = todoData.filter((item) => item.id === e);
//   let b = todoData.filter((item) => item.id !== e);
//   localStorage.removeItem("todo");
//   setTodoData(localStorage.setItem("todo", JSON.stringify(b)) || []);
//   localStorage.setItem("todo", JSON.stringify(b));
//   let newTask = a[0];
//   doingData.push(newTask);
//   localStorage.setItem("doing", JSON.stringify(doingData));
// };

// ---------------------MOVING TASK TO TODO------------------------------------------
// const moveToDo = (e) => {
//   let a = doingData.filter((item) => item.id === e);
//   let b = doingData.filter((item) => item.id !== e);
//   localStorage.removeItem("doing");
//   setDoingData(localStorage.setItem("doing", JSON.stringify(b)) || []);
//   localStorage.setItem("doing", JSON.stringify(b));
//   let newTask = a[0];
//   todoData.push(newTask);
//   localStorage.setItem("todo", JSON.stringify(todoData));
// };

// ---------------------MOVING TASK TO DONE------------------------------------------
// const moveToDone = (e) => {
//   let a = doingData.filter((item) => item.id === e);
//   let b = doingData.filter((item) => item.id !== e);
//   localStorage.removeItem("doing");
//   setDoingData(localStorage.setItem("doing", JSON.stringify(b)) || []);
//   localStorage.setItem("doing", JSON.stringify(b));
//   let newTask = a[0];
//   doneData.push(newTask);
//   localStorage.setItem("done", JSON.stringify(doneData));
// };
