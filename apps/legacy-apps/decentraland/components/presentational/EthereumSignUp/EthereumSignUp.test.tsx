import React from "react";
import { shallow } from "enzyme";
import EthereumSignUp from "../EthereumSignUp";

describe("EthereumSignUp", () => {
  it("renders the component", () => {
    const onUsernameSubmit = (): void => {};
    expect(
      shallow(<EthereumSignUp onUsernameSubmit={onUsernameSubmit} />)
    ).toMatchSnapshot();
  });
});
