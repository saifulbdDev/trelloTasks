/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import { read_cookie, bake_cookie } from "../../common/cookies";
import { BOARD_COOKIE } from "../../common/constants";
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_CARD,
  REMOVE_CARD,
  MOVE_CARD,
  RECEIVE_DATA,
  UPDATE_BOARD,
  CREATE_CARD,
  UPDATE_CARD,
} from "../actions/actionTypes";

const initialState = {
  boardStore: [],
};

const boardStore = (state = initialState.boardStore, action: any) => {

   
     let boardStore: string[] =  state;
     
   
  switch (action.type) {
    case ADD_COLUMN:
      boardStore.concat(state, action.boardStore);
      console.log(state, action.boardStore, 'ADD_COLUMN')
      break;
    case REMOVE_COLUMN:
      boardStore.concat(state, action.boardStore);
      break;
    case ADD_CARD:
      boardStore.concat(state, action.boardStore);
      break;
    case REMOVE_CARD:
      boardStore.concat(state, action.boardStore);
      break;
    case MOVE_CARD:
    boardStore.concat(state, action.boardStore);
      break;
    case RECEIVE_DATA:
    boardStore.concat(state, action.boardStore);
      break;
    case UPDATE_BOARD:
    boardStore.concat(state, action.boardStore);
      break;
    case CREATE_CARD:
    boardStore.concat(state, action.boardStore);
      break;
    case UPDATE_CARD:
    boardStore.concat(state, action.boardStore);
      break;
    default:
      boardStore = read_cookie(BOARD_COOKIE) || state;
  }

  bake_cookie(BOARD_COOKIE, boardStore);
  return boardStore;
};



export default boardStore;
