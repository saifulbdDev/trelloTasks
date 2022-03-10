import { connect } from "react-redux";
import {
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
    moveCard: (cardId: number, sourceCategory: string, destinationCategory: string) => {
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
