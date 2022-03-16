/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ChangeEvent, useState, useRef } from "react";
import "./_styles.scss";
import closeIcon from "../../styles/images/kindpng_2148901.png";
import { Outside } from "../../common/outside";
interface ICardProps {
  category: string;
  categoryTasks?: any;
  createCard?: any;
  removeCard?: any;
  updateCard?: any;
  draggableCard?: any;
  editable?: boolean;
  draggable?: boolean;
  text?: string;
  value?: string;
  id: number;
}

export const Card: React.FC<ICardProps> = (props) => {
  const [updateText, setText] = useState(props.text);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const editCardRef = useRef(null);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  Outside(editCardRef, () => setEditTitle(false));
  const handleOnEdit = () => {
    setEditTitle(true);
  };
  const handleOnClose = () => {
    setEditTitle(false);
    setText(props.text);
  };
  const handleOnDragOff = () => {
    props.draggableCard(props.id, props.category);
  };

  const handleOnRemove = () => {
    props.removeCard(props.id);
  };

  const handleUpdate = () => {
    if (updateText) {
      props.updateCard({ title: updateText, id: props.id });
      setEditTitle(false);
    } else {
      setText(props.text);
    }
  };

  const handleOnDragStart = (ev: any, id: number) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("sourceCategory", props.category);
    setIsDragged(true);
  };

  const handleOnDragStop = () => {
    setIsDragged(false);
  };

  const getInputField = () => {
    return (
      <div className="add-from " ref={editCardRef}>
        <textarea
          placeholder="Enter a title for this card…"
          value={updateText}
          onChange={handleChange}
        />

        <div className="cardfrom-btn-group">
          <button className="addcard-submit" onClick={handleUpdate}>
            Save
          </button>
          <a href="#" className="addcard-close" onClick={handleOnClose}>
            <img width="20" src={closeIcon} alt="close icon" />
          </a>
        </div>
      </div>
    );
  };
  const title = () => {
    return (
      <div className="card-body">
        {props.text}
        <div className="card-actions">
          <button className="button-edit" onClick={handleOnEdit}>
            <i className="fas fa-pencil-alt"></i>
          </button>

          <button className="button-draggable" onClick={handleOnDragOff}>
            <i
              className={`fas ` + (props.draggable ? `fa-unlock` : "fa-lock")}
            ></i>
          </button>
          <button className="button-remove" onClick={handleOnRemove}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  };

  const content = editTitle ? getInputField() : title();

  return (
    <div
      id={props.draggable ? "" : "notDragged"}
      className={`card ` + (isDragged && props.draggable ? "isDragged" : "")}
      onDragStart={(e) => handleOnDragStart(e, props.id)}
      onDragEnd={handleOnDragStop}
      draggable={props.draggable}
    >
      {content}
    </div>
  );
};
