import * as constants from "./actionTypes";

import { read_cookie, bake_cookie } from "../../common/cookies";
import { BOARD_COOKIE } from "../../common/constants";

export const moveCard = (
  cardId: number,
  sourceCategory: string,
  destinationCategory: string
) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(addCard(boardStore, cardId, sourceCategory, destinationCategory));
    dispatch(removeCardFromColumn(cardId, sourceCategory));
  };
};

export const updateCard = (card: any, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    const updatedCard = card;
    dispatch(removeCard(boardStore, card.id, destinationCategory));
    dispatch(createNewCard(boardStore, updatedCard, destinationCategory));
  };
};

export const addCard = (
  boardStore: any,
  cardId: number,
  sourceCategory: string,
  destinationCategory: string
) => {
  const cardToMove = boardStore[sourceCategory].filter((card: any) => {
    return card.id === +cardId;
  });
  boardStore[destinationCategory] = [
    ...cardToMove,
    ...boardStore[destinationCategory],
  ];
  return {
    type: constants.ADD_CARD,
    boardStore: boardStore,
  };
};

export const createColumn = (newColumn: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(createNewColumn(boardStore, newColumn));

    // console.log(boardStore, "createColumn");
  };
};

export const createNewColumn = (boardStore: any, newColumn: any) => {
  boardStore.push(newColumn);

  return {
    type: constants.ADD_COLUMN,
    boardStore: boardStore,
  };
};

export const updateColumn = (updateColumn: string, oldColumn: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(updateOldColumn(boardStore, updateColumn, oldColumn));
  };
};

export const updateOldColumn = (
  boardStore: any,
  newColumn: string,
  oldColumn: string
) => {
  boardStore[newColumn] = boardStore[oldColumn]; // Assign new key
  delete boardStore[oldColumn]; // Delete old key

  return {
    type: constants.COLUMN_UPDATE,
    boardStore: boardStore,
  };
};
export const createCard = (newCard: any, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(createNewCard(boardStore, newCard, destinationCategory));
  };
};

export const createNewCard = (
  boardStore: any,
  newCard: any,
  destinationCategory: any
) => {
 
  boardStore[destinationCategory].tasks.push(newCard);
  
  return {
    type: constants.CREATE_CARD,
    boardStore: boardStore,
  };
};

export const removeCard = (
  boardStore: any,
  cardId: number,
  sourceCategory: string
) => {
  if (boardStore) {
    boardStore[sourceCategory] = boardStore[sourceCategory].filter(
      (card: any) => {
        return card.id !== +cardId;
      }
    );
  }
  return {
    type: constants.REMOVE_CARD,
    boardStore: boardStore,
  };
};

export const removeCardFromColumn = (
  cardId: number,
  sourceCategory: string
) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(removeCard(boardStore, cardId, sourceCategory));
  };
};

export const fetchData = () => {
  return (dispatch: any) => {
    console.log("fetchData");
    const boardStore = read_cookie(BOARD_COOKIE);
    let data;
    if (boardStore && boardStore.constructor === Object) {
      data = [];
    } else data = boardStore;

    dispatch({ type: constants.RECEIVE_DATA, boardStore: data });
  };
};

export const receiveData = (data: any, state: any) => {
  return {
    type: constants.RECEIVE_DATA,
    state,
  };
};

export const updateBoard = (data: any, state: any) => {
  return {
    type: constants.UPDATE_BOARD,
    state,
  };
};
function dispatch(arg0: (dispatch: any) => void) {
  throw new Error("Function not implemented.");
}
