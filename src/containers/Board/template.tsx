import React from "react";
import "./Board.scss";
import { connect } from "react-redux";
import { fetchData } from "../../store/actions/actions";
import { Column } from "../../components/Column/template";


export interface IAppState {
  boardStore: any;
}

interface IBoardProps {
  fetchData: () => void;
  removeCardFromColumn: (cardId: number, sourceCategory: string) => void;
  moveCard: (cardId: number, sourceCategory: string, destinationCategory: string) => void;
  updateCard: (card: any, destinationCategory: string) => void;
  createCard?: (card: any, destinationCategory: string) => void;
  boardStore: any;
}

interface IBoardState {
  boardStore: any;
}

export const Board: React.FC<IBoardProps & IBoardState> = (props: IBoardProps) => {
  const [, setState] = React.useState<IBoardState>(props);

  const { boardStore, fetchData } = props;

  // const handleAdd = () => {
  //   // const maxIdPerCategory = Math.max(
  //   //   ...props.categoryTasks.map((item: any) => item.id),
  //   //   0
  //   // );
  //   const nextId = maxIdPerCategory + 1;
  //   const cardText = `${"Card" + nextId}`;
  //   const new_task = { id: nextId, text: cardText };
  //   const categoryTasks = [new_task, ...props.categoryTasks];
  //   setState({ ...state, category: state.category, categoryTasks: categoryTasks });
  //   props.createCard(new_task, props.category);
  // };

  React.useEffect(() => {
    setState({
      boardStore: {}
    });
  }, [boardStore]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("Board: ", boardStore);
  const boardColumns = (props.boardStore && Object.keys(props.boardStore)) || [];
  const columns = boardColumns.map((category: string, key: number) => {
    return (
      <Column
        key={key}
        category={category}
        removeCardFromColumn={props.removeCardFromColumn}
        moveCard={props.moveCard}
        createCard={props.createCard}
        updateCard={props.updateCard}
        categoryTasks={props.boardStore[category]}
      />
    );
  });

  return <div className="Board board-lists"> {columns} <div><input type="text" placeholder="fnfnfn"/></div> </div>;
}


export default connect(
  (state: IAppState) => {
    let boardStore;
    if (state.boardStore.constructor === Array) {
      boardStore = {};
    } else boardStore = state.boardStore;
    return { boardStore };
  },
  { fetchData }
)(Board);
