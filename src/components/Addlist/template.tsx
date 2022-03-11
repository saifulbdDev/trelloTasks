import React, { useState, ChangeEvent } from "react";
import "./styles.scss";

interface ICardProps { 
  boardStore : any,
  createColumn: any,
 
}
interface IColumnState {

  boardStore : any,
}




export const Addlist: React.FC<ICardProps & IColumnState> = (props) => {
  // const [state, setState] = useState<IColumnState>(props);
   
  // const [isDragged, setIsDragged] = React.useState<boolean>(false);

  const [listName, setNewname] = useState("");

  const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewname(e.target.value);
  };
  const handleAdd = () => {

    props.boardStore[listName] = [];
  
    // console.log(listName, )
    // // const maxIdPerCategory = Math.max(
    // //   ...props.categoryTasks.map((item: any) => item.id),
    // //   0
    // // );
 
    props.createColumn(listName);
  
  };

 



  return (
    <div>
        <input type="text" placeholder="Enter list title…" onChange={nameChange} />
        <button onClick={handleAdd}>Add List</button>
      </div>
  );

}