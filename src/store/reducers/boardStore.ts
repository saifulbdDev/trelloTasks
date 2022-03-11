import { read_cookie, bake_cookie } from "sfcookies";
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
  let boardStore;
  console.log(action, 'action.type')
  switch (action.type) {
    case ADD_COLUMN:
      boardStore =  action.boardStore;
      break;
    case REMOVE_COLUMN:
      boardStore =  action.boardStore;
      break;
    case ADD_CARD:
      boardStore =  action.boardStore;
      break;
    case REMOVE_CARD:
      boardStore =  action.boardStore;
      break;
    case MOVE_CARD:
      boardStore =  action.boardStore;
      break;
    case RECEIVE_DATA:
      boardStore =  action.boardStore;
      break;
    case UPDATE_BOARD:
      boardStore =  action.boardStore;
      break;
    case CREATE_CARD:
      boardStore =  action.boardStore;
      break;
    case UPDATE_CARD:
      boardStore = action.boardStore;
      break;
    default:
      boardStore = read_cookie(BOARD_COOKIE) || state;
  }

  bake_cookie(BOARD_COOKIE, boardStore);
  return boardStore;
};



export default boardStore;
