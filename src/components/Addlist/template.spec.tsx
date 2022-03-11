import React from "react";
import { shallow } from "enzyme";
import { Addlist } from "./";

describe("Card", () => {
  const props = { 
  
    boardStore : {},
    createColumn: jest.fn(),

   };
  const addlist = shallow(<Addlist {...props} />);
  it("renders properly", () => {
    expect(addlist).toMatchSnapshot();
  });
});
