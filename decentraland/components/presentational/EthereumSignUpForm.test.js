import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { shallow } from "enzyme";
import EthereumSignUpForm from "./EthereumSignUpForm";

describe("EthereumSignUpForm", () => {
  jest.useFakeTimers();
  let wrapper;
  let onSignUp;

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
    onSignUp = jest.fn();
    wrapper = shallow(<EthereumSignUpForm onSignUp={onSignUp} />);
  });

  it("renders the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("creates a wallet - calling function", () => {
    wrapper
      .find("Button")
      .find({ title: "Continue" })
      .simulate("press");

    expect(onSignUp.mock.calls.length).toBe(1);
  });
});
