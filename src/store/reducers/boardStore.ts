/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import { read_cookie, bake_cookie } from "../../common/cookies";
import { BOARD_COOKIE } from "../../common/constants";
import {
  ADD_COLUMN,
  COLUMN_UPDATE,
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

  switch (action.type) {
    case ADD_COLUMN:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case COLUMN_UPDATE:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case REMOVE_COLUMN:
      boardStore = Object.assign([],  action.boardStore);
      break;
    case ADD_CARD:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case REMOVE_CARD:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case MOVE_CARD:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case RECEIVE_DATA:
      boardStore = state || action.boardStore;
      break;
    case UPDATE_BOARD:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case CREATE_CARD:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    case UPDATE_CARD:
      boardStore = Object.assign([], state, action.boardStore);
      break;
    default:
      boardStore = read_cookie(BOARD_COOKIE) || state;
  }

  bake_cookie(BOARD_COOKIE, boardStore);
  return boardStore;
};

export default boardStore;
