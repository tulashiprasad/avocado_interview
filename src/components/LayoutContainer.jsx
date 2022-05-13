import React, { useReducer, useState } from "react";
import "./LayoutContainer.css";
import Read from "./read/Read";
import Tableitem from "./read/Tableitem";
import { reducer, ACTION } from "../reducer";

const LayoutContainer = () => {
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [status, setStatus] = useState();
  const [layout, setLayout] = useState();

  const [state, dispatch] = useReducer(reducer, []);

  const addImage = () => {
    dispatch({
      type: ACTION.LAYOUT_CHANGE,
      payload1: URL.createObjectURL(img),
      payload2: name,
      payload3: capacity,
      payload4: `${status ? "active" : "inactive"}`,
      payload5: layout,
      payload6: state,
    });
    setName("");
    setCapacity("");
    setLayout("Select Layout");
  };

  return (
    <>
      <div className="container">
        <div className="innerContainer">
          <div className="heading">
            <h4>Create Table</h4>
          </div>
          <div className="upper__container">
            <div className="layout">
              <label htmlFor="">Layout:</label>
              <select
                name="layout"
                id=""
                value={layout}
                onChange={(e) => {
                  setLayout(e.target.value);
                }}
              >
                <option value="Not selected">Select Layout</option>
                <option value="Potrait">Potrait</option>
                <option value="Landspape">Landspape</option>
              </select>
            </div>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name=""
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label htmlFor="Capacity">
              Capacity:
              <input
                type="text"
                name=""
                value={capacity}
                id="Capacity"
                placeholder="Enter  number of Capacity"
                onChange={(e) => {
                  setCapacity(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="lower__container">
            <label htmlFor="status">
              Status:
              <input
                type="checkbox"
                name=""
                id="status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
            </label>
            <label htmlFor="image">
              Image:
              <input
                type="file"
                name=""
                id="image"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
                accept="image/*"
              />
            </label>
          </div>
          <div className="btns">
            <button className="create" onClick={capacity && name && addImage}>
              Create Table
            </button>
            <button
              className="cancel"
              onClick={() => {
                setName("");
                setCapacity("");
                setLayout("Select Layout");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div style={{ minWidth: "1151px" }}>
        <Read />
        {state.map((item, index) => (
          <Tableitem
            key={index}
            id={index}
            layout={item.layout}
            capacity={item.capacity}
            name={item.name}
            status={item.status}
            image={item.image}
            dispatch={dispatch}
          />
        ))}
      </div>
    </>
  );
};

export default LayoutContainer;
