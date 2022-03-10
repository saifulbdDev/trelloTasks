import React from "react";
import { shallow } from "enzyme";
import { Card } from "./";

describe("Card", () => {
  const props = { id: 1, text: "abc", value: "", category: "abc" };
  const card = shallow(<Card {...props} />);
  it("renders properly", () => {
    expect(card).toMatchSnapshot();
  });
});
