import React, {useRef} from "react";
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

interface ICardState {
  id?: number;
  text?: string;
  value?: string;
  editable?: boolean;
}

export const Card: React.FC<ICardProps> = (props) => {
  const [state, setState] = React.useState<ICardState>(props);
  const [isDragged, setIsDragged] = React.useState<boolean>(false);
  const [editTitle, setEditTitle] = React.useState<boolean>(false);
  const editCardRef = useRef(null);
  Outside(editCardRef, () => setEditTitle(false));
  const handleOnEdit = () => {
    setEditTitle(true);
    setState({ value: state.text });
  };
  const handleOnClose = () => {
    setEditTitle(false);
  };
  const handleOnDragOff = () => {
      props.draggableCard(props.id, props.category);
  };

  const handleOnRemove = () => {
    props.removeCard(props.id);
  };



  const handleChange = (event: any) => {
    setState({ value: event.target.value });
  };
  const handleUpdate = () => {
    if(state.value){
    props.updateCard({title:state.value,  id:props.id});
    setEditTitle(false);
    setState({ value: state.value, text: state.value });
    }else{
      setState({ text: state.text });
    }
  };

  const handleOnDragStart = (ev: any, id: number) => {
    console.log(id);
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
        value={state.text}
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
      <div className="card-body">{props.text}
      <div className="card-actions">
        <button className="button-edit" onClick={handleOnEdit}>         
        <i className="fas fa-pencil-alt"></i>
        </button>
     
        <button className="button-draggable" onClick={handleOnDragOff}>
          <i className={`fas `+ (props.draggable ?  `fa-unlock` : 'fa-lock') }></i>
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
      className={`card ` + (isDragged ? "isDragged" : "")}
      onDragStart={(e) => handleOnDragStart(e, props.id)}
      onDragEnd={handleOnDragStop}
      draggable={props.draggable}
    >
      {content}
      
    </div>
  );
};
