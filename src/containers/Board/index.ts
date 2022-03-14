/* eslint-disable @typescript-eslint/no-unused-vars */
import { connect } from "react-redux";
import {
  createColumn,
  updateColumn,
  dateleColumn,
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

    updateColumn: (updateTitle: string, catId: any) => {
      dispatch(updateColumn(updateTitle, catId));
    },
    dateleColumn: (catId: any) => {
      dispatch(dateleColumn(catId));
    },
    moveCard: (
      cardId: any,
      sourceCategory: string,
      destinationCategory: string
    ) => {
      dispatch(moveCard(cardId, sourceCategory, destinationCategory));
    },

    removeCardFromColumn: (cardId: any, sourceCategory: string) => {
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
