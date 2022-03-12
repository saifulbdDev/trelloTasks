import React from "react";
import "./_style.scss";
import { connect } from "react-redux";
import { fetchData } from "../../store/actions/actions";
import { Column } from "../../components/Column/template";
import { Addlist } from "../../components/Addlist/template";

export interface IAppState {
  boardStore: any;
}


 
interface IBoardProps {
  removeCardFromColumn: (cardId: number, sourceCategory: string) => void;
  moveCard: (
    cardId: number,
    sourceCategory: string,
    destinationCategory: string
  ) => void;
  updateCard: (card: any, destinationCategory: string) => void;
  fetchData: () => void;
  createColumn?: (newColumn: string) => void;
  createCard?: (card: any, destinationCategory: string) => void;

  boardStore: any;
}

interface IBoardState {
  boardStore: any;
}

export const Board: React.FC<IBoardProps & IBoardState> = (
  props: IBoardProps
) => {
  const [, setState] = React.useState<IBoardState>(props);

  const { boardStore, fetchData } = props;

  React.useEffect(() => {
    setState({
      boardStore: {}
    });
  }, [boardStore]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(props.boardStore, "boardStore");

  const boardColumns =
    (props.boardStore && Object.keys(props.boardStore)) || [];
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

  return (
    <div className="board-lists">
      {columns}

      <Addlist
        createColumn={props.createColumn}
        boardStore={props.boardStore}
      />
    </div>
  );
};

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

