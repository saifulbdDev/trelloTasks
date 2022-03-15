import React from "react";
import { Board }  from "./template";
import { shallow } from "enzyme";

describe("Board", () => {
  const props = {
    category: 1,
    catKey: 1,
    createCard: jest.fn(),
    createColumn: jest.fn(),
    fetchData: jest.fn(),
    moveCard: jest.fn(),
    updateCard: jest.fn(),
    draggableCard: jest.fn(),
    updateColumn: jest.fn(),
    dateleColumn: jest.fn(),
    removeCardFromColumn: jest.fn(),
    boardStore: []
  };
  let board = shallow(<Board {...props} />);
  it("renders properly", () => {
    expect(board).toMatchSnapshot();
  });
});
