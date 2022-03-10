import React from "react";
import { Board }  from "./template";
import { shallow } from "enzyme";

describe("Board", () => {
  const props = {
    category: "abc",
    createCard: jest.fn(),
    fetchData: jest.fn(),
    moveCard: jest.fn(),
    updateCard: jest.fn(),
    removeCardFromColumn: jest.fn(),
    boardStore: {}
  };
  let board = shallow(<Board {...props} />);
  it("renders properly", () => {
    expect(board).toMatchSnapshot();
  });
});
