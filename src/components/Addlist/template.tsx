/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, ChangeEvent } from "react";
import "./_styles.scss";
import closeIcon from "../../styles/images/kindpng_2148901.png";
interface ICardProps {
  boardStore: any;
  createColumn: any;
}
interface IColumnState {
  boardStore: any;
}

export const Addlist: React.FC<ICardProps & IColumnState> = (props) => {
  const [addList, setList] = React.useState<boolean>(false);
  const [listName, setNewname] = useState("");
  const [nameError, setError] = useState("");
  const titile = Object.keys(props.boardStore).length
    ? "Add another list"
    : "Add a list";

  const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewname(e.target.value);
    setError("");
  };

  const handleOnAdd = () => {
    setList(true);
  };
  const handleOnClose = () => {
    setList(false);
  };
  const handleAdd = () => {
    if (listName == "") {
     
    } else {
      if (props.boardStore.hasOwnProperty('column_'+listName)) {
        setError("This list name already exist.");
      } else {
         
        props.createColumn('column_'+listName);
        setNewname("");
      }
    }
  };

  const addListFrom = () => {
    return (
      <div className={`addlist-from ` + (nameError ? "error-from" : "")}>
        <input
          type="text"
          className="addlist-input"
          placeholder="Enter list title…"
          onChange={nameChange}
          value={listName}
        />
        <div className="error-text">{nameError}</div>
        <div className="addlist-from-btn-group">
          <button className="addlist-submit" onClick={handleAdd}>
            Add List
          </button>
          <a href="#"  className="addlist-close" onClick={handleOnClose}>
            <img width="20" src={closeIcon} alt="close icon" />
          </a>
        </div>
      </div>
    );
  };
  const addListButton = () => {
    return (
      <span className="addlist-btn" onClick={handleOnAdd}>
        <i className="fas fa-plus"></i> {titile}
      </span>
    );
  };

  const content = addList ? addListFrom() : addListButton();

  return (
    <div
      className={`addlist-container list ` + (addList ? "" : "addlist-active")}
    >
      {content}
    </div>
  );
};
