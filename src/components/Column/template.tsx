
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Outside } from "../../common/outside";
import { v4 as uuidv4 } from "uuid";
import closeIcon from "../../styles/images/kindpng_2148901.png";
import { Card } from "../Card/";
import "./_styles.scss";

interface IColumnProps {
  category: any;
  catkey: any;
  categoryTasks: any;
  createCard: any;
  updateCard: (card: any, destinationCategory: string) => void;
  updateColumn: (upColumn: string, oldColumn: string) => void;
  dateleColumn: (catId: string) => void;
  moveCard: (
    cardId: string,
    sourceCategory: string,
    destinationCategory: string
  ) => void;
  removeCardFromColumn: (id: number, category: string) => void;
}

interface IColumnState {
  category: string;
  categoryTasks: string[];
}

export const Column: React.FC<IColumnProps & IColumnState> = (props) => {
  const [state, setState] = useState<IColumnState>(props);
  const wrapperRef = useRef(null);
  const [newtext, setNewtext] = useState("");
  const categoryTasks = props.categoryTasks;
  const category = props.category ? props.category : "";
  const [addCard, setAddcard] = React.useState<boolean>(false);
  const [updateTitle, setTitle] = useState(category.title);
  const [titleEditble, setTitleEditble] = React.useState<boolean>(false);
  const textChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewtext(e.target.value);
  };
  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  Outside(wrapperRef, () => titileOnSave());

  useEffect(() => {
    setState({
      category: props.category,
      categoryTasks: [],
    });
  }, [props.category]);
  const titileOnUpdate = () => {
    setTitleEditble(true);
  };

  const titileOnSave = () => {
    setTitleEditble(false);

    if (updateTitle !== category.title && updateTitle !== "") {
      console.log("updateTitle", updateTitle);
      props.updateColumn(updateTitle, category.id);
    } else {
      setTitle(category.title);
    }
  };

  const columnOnDelete = () => {
    props.dateleColumn(category.id);
  };
  const handleOnAdd = () => {
    setAddcard(true);
  };
  const handleOnClose = () => {
    setAddcard(false);
  };
  const handleAdd = () => {
    if (newtext) {
      const new_task = { id: uuidv4(), text: newtext };
      const categoryTasks = [new_task, ...props.categoryTasks];

      setState({
        ...state,
        category: state.category,
        categoryTasks: categoryTasks,
      });

      props.createCard(new_task, props.catkey);
      setNewtext("");
    }
  };

  const handleRemove = (cardIdToRemove: number) => {
    const categoryTasks = props.categoryTasks.filter((task: any) => {
      return task.id !== cardIdToRemove;
    });
    setState({ ...state, categoryTasks: categoryTasks });
    props.removeCardFromColumn(cardIdToRemove, props.catkey);
  };

  const handleUpdate = (card: any) => {
    const new_task = card;
    const categoryTasks = [new_task, ...props.categoryTasks];
    setState({ ...state, categoryTasks: categoryTasks });
    props.updateCard(new_task, props.category);
  };

  const handleOnDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: any) => {
    let id = event.dataTransfer.getData("id");
    let sourceCategory = event.dataTransfer.getData("sourceCategory");
    moveTask(id, sourceCategory);
  };

  const moveTask = (taskId: string, sourceCategory: string) => {
    if (sourceCategory !== props.catkey) {
      props.moveCard(taskId, sourceCategory, props.catkey);
    }
  };

  const cards = categoryTasks.map((task: any, key: number) => (
    <Card
      key={key}
      id={task.id}
      text={task.text}
      category={props.catkey}
      removeCard={handleRemove}
      updateCard={handleUpdate}
    />
  ));

  const addListFrom = () => {
    return (
      <div className="add-from ">
        <textarea
          placeholder="Enter a title for this card…"
          value={newtext}
          onChange={textChange}
        />

        <div className="cardfrom-btn-group">
          <button className="addcard-submit" onClick={handleAdd}>
            Add card
          </button>
          <a href="#" className="addcard-close" onClick={handleOnClose}>
            <img width="20" src={closeIcon} alt="close icon" />
          </a>
        </div>
      </div>
    );
  };
  const addListButton = () => {
    return (
      <div className="addcard-btn-group">
        <a href="#" className="addcard-btn" onClick={handleOnAdd}>
          <i className="fas fa-plus"></i> Add card
        </a>
        <span className="addcard-icon">
          <i className="fas fa-file-video"></i>
        </span>
      </div>
    );
  };

  const content = addCard ? addListFrom() : addListButton();

  return (
    <div className="list" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      <div className="list-header">
        <div className="list-header-contant">        
          <input
            className={titleEditble ? "list-header-field" : "list-header-title"}
            ref={wrapperRef}
            onChange={titleChange}
            onDoubleClick={titileOnUpdate}
            readOnly={!titleEditble}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                titileOnSave();
              }
            }}
            value={updateTitle}
          />
        </div>
        <div className="list-header-actions">
          <a href="#" onClick={columnOnDelete} className="list-header-action">
            <i className="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>

      <div className="task-container droppable">
        {cards}
        {content}
      </div>
    </div>
  );
};
