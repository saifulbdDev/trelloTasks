import React, { useState, ChangeEvent, } from "react";

import { Card } from "../Card/";
import "./styles.scss";

interface IColumnProps {
  category: string;
  categoryTasks: any;
  createCard: any;
  updateCard: (card: any, destinationCategory: string) => void;
  moveCard: (
    cardId: number,
    sourceCategory: string,
    destinationCategory: string
  ) => void;
  removeCardFromColumn: (id: number, category: string) => void;
}

interface tasks {
  title: string;
  id: number;
  tasks: any;

}
  
interface IColumnState {
  category: string;
  categoryTasks: any;
}

export const Column: React.FC<IColumnProps & IColumnState> = (props) => {
  const [state, setState] = useState<IColumnState>(props);
  const [newtext, setNewtext] = useState("");
  const [Addcard, setAddcard] = React.useState<boolean>(false);

  const textChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewtext(e.target.value);
  };

  React.useEffect(() => {
    setState({
      category: props.category,
      categoryTasks: [],
    });
  }, [props.category]);

  const handleAdd = () => {
    const maxIdPerCategory = Math.max(
      ...props.categoryTasks.map((item: any) => item.id),
      0
    );
    const nextId = maxIdPerCategory + 1;
    // const cardText = `${"Card" + nextId}`;
    const new_task = { id: nextId, text: newtext };
    const categoryTasks = [new_task, ...props.categoryTasks];
  
    setState({
      ...state,
      category: state.category,
      categoryTasks: categoryTasks,
    });
  
    props.createCard(new_task, props.category);
  };

  const handleRemove = (cardIdToRemove: number) => {
    const categoryTasks = props.categoryTasks.filter((task: any) => {
      return task.id !== cardIdToRemove;
    });
    setState({ ...state, categoryTasks: categoryTasks });
    props.removeCardFromColumn(cardIdToRemove, state.category);
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

  const moveTask = (taskId: number, sourceCategory: string) => {
    if (sourceCategory !== state.category) {
      props.moveCard(taskId, sourceCategory, state.category);
    }
  };

  const categoryTasks = props.categoryTasks;
  const category = props.category ? props.category : "";
  const cards = categoryTasks.map((task: any, key: number) => (
    <Card
      key={key}
      id={task.id}
      text={task.text}
      category={category}
      removeCard={handleRemove}
      updateCard={handleUpdate}
    />
  ));

  return (
    <div
      className="list"
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
   
        <h3 className="list-title">
          {category.split(/(?=[A-Z])/).join(" ") +
            " (" +
            categoryTasks.length +
            ")"}
        </h3>
    
      <div className="task-container droppable">
        {cards}
        <div  className="add-card">
          <div className="add-from">
          <textarea
            placeholder="Enter a title for this card…"
            value={newtext}
            onChange={textChange}
          />

          <button className="add-button" onClick={handleAdd}>
       
            <span role="img" aria-label="plus">
              Add card
            </span>
          </button>
          </div>
       
        
        </div>
      </div>
    </div>
  );
};
