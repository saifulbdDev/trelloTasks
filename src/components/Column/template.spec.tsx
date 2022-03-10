import React from "react";
import { shallow } from "enzyme";
import { Column } from "./";
import { Card } from "../Card";

describe("Column", () => {
  const props = {
    categoryTasks: [],
    category: "abc",
    createCard: jest.fn(),
    moveCard: jest.fn(),
    updateCard: jest.fn(),
    removeCardFromColumn: jest.fn(),
  };

  it("renders properly", () => {
    const wrapper = shallow(<Column {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render different cards ", () => {
    const mockCategoryTasks = ["a", "b", "c"];
    const wrapper = shallow(<Column {...props} categoryTasks={mockCategoryTasks} />);
    expect(wrapper.find(Card)).toHaveLength(3);
  });
});
