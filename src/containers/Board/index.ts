/* eslint-disable @typescript-eslint/no-unused-vars */
import { connect } from "react-redux";
import {
  createColumn,
  updateColumn,
  moveCard,
  removeCardFromColumn,
  createCard,
  updateCard,
} from "../../store/actions/actions";
import Board, { IAppState } from "./template";

const mapStateToProps = (state: IAppState) => {
  return {
    boardStore: state.boardStore,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createColumn: (newColumn: any) => {
      dispatch(createColumn(newColumn));
    },

    updateColumn: (upColumn: any, oldColumn: string) => {
      dispatch(updateColumn(upColumn, oldColumn));
    },
    moveCard: (
      cardId: number,
      sourceCategory: string,
      destinationCategory: string
    ) => {
      dispatch(moveCard(cardId, sourceCategory, destinationCategory));
    },

    removeCardFromColumn: (cardId: number, sourceCategory: string) => {
      dispatch(removeCardFromColumn(cardId, sourceCategory));
    },
    createCard: (card: any, destinationCategory: string) => {
      dispatch(createCard(card, destinationCategory));
    },

    updateCard: (card: any, destinationCategory: string) => {
      dispatch(updateCard(card, destinationCategory));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
