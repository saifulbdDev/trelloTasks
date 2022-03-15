/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as constants from "./actionTypes";

import { read_cookie, } from "../../common/cookies";
import { BOARD_COOKIE } from "../../common/constants";

export const createColumn = (newColumn: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(createNewColumn(boardStore, newColumn));
  };
};

export const createNewColumn = (boardStore: any, newColumn: any) => {
  boardStore.push(newColumn);

  return {
    type: constants.ADD_COLUMN,
    boardStore: boardStore,
  };
};

export const updateColumn = (updateTitle: string, catId: any) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(updateOldColumn(boardStore, updateTitle, catId));
  };
};

export const updateOldColumn = (
  boardStore: any,
  updateTitle: string,
  catId: string
) => {
  boardStore = boardStore.map((obj: { id: string }) => {
    if (obj.id === catId) {
      return { ...obj, title: updateTitle };
    }

    return obj;
  });

  return {
    type: constants.COLUMN_UPDATE,
    boardStore: boardStore,
  };
};
export const dateleColumn = (catId: any) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(dateleOnColumn(boardStore, catId));
  };
};

export const dateleOnColumn = (boardStore: any, catId: string) => {
  boardStore = boardStore.filter((obj: any) => {
    return obj.id !== catId;
  });

  return {
    type: constants.REMOVE_COLUMN,
    boardStore: boardStore,
  };
};

export const createCard = (newCard: any, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(createNewCard(boardStore, newCard, destinationCategory));
  };
};
export const updateCard = (card: any, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
  
    dispatch(updateOldCard(boardStore, card, destinationCategory));
   
  };
};
export const updateOldCard = (
  boardStore: any,
  card: any,
  catId: string
) => {

 
   boardStore[catId].tasks.map((obj: { text:string, id: string }) => {
    if (obj.id === card.id) {
      obj.text = card.title;
     
    }

    return obj;
  });

  console.log(boardStore, "card", catId, "catId");

  return {
    type: constants.UPDATE_CARD,
    boardStore: boardStore,
  };
};
export const draggableCard = (cardId: any, sourceCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(draggableOnCard(boardStore, cardId, sourceCategory));
  };
};
export const draggableOnCard = (
  boardStore: any,
  catId: string,
  sourceCategory: string
) => {
  // eslint-disable-next-line array-callback-return
  boardStore[sourceCategory].tasks.filter((card: any) => {
    if (card.id === catId) {
      // eslint-disable-next-line eqeqeq
      card.draggable  =  !card.draggable;
   
     
    }
  });

  return {
    type: constants.DRAGGABLE_CARD,
    boardStore: boardStore,
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

export const moveCard = (
  cardId: string,
  sourceCategory: string,
  destinationCategory: string
) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(addCard(boardStore, cardId, sourceCategory, destinationCategory));
    dispatch(removeCardFromColumn(cardId, sourceCategory));
  };
};
export const addCard = (
  boardStore: any,
  cardId: string,
  sourceCategory: string,
  destinationCategory: string
) => {
  const cardToMove = boardStore[sourceCategory].tasks.filter((card: any) => {
    return card.id === cardId;
  });

  boardStore[destinationCategory].tasks = [
    ...cardToMove,
    ...boardStore[destinationCategory].tasks,
  ];
  return {
    type: constants.ADD_CARD,
    boardStore: boardStore,
  };
};

export const removeCardFromColumn = (
  cardId: string,
  sourceCategory: string
) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(removeCard(boardStore, cardId, sourceCategory));
  };
};

export const removeCard = (
  boardStore: any,
  cardId: string,
  sourceCategory: string
) => {
  if (boardStore) {
    console.log(boardStore, cardId, sourceCategory, "removeCard");
    boardStore[sourceCategory].tasks = boardStore[sourceCategory].tasks.filter(
      (card: any) => {
        return card.id !== cardId;
      }
    );
  }
  return {
    type: constants.REMOVE_CARD,
    boardStore: boardStore,
  };
};

export const fetchData = () => {
  return (dispatch: any) => {
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
