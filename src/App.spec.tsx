import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  const props = {};
  const app = shallow(<App {...props} />);
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
});
