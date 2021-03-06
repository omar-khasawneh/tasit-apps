import React from "react";
import { shallow } from "enzyme";
import LinkToBlockchain from "../LinkToBlockchain";
import { anAction } from "../../../helpers/testHelpers";

describe("LinkToBlockchain", () => {
  describe("renders the component", () => {
    it("null action", () => {
      const actionId = null;
      expect(
        shallow(<LinkToBlockchain actionId={actionId} type="action" />)
      ).toMatchSnapshot();
    });

    it("valid action", async () => {
      const actionId = await anAction.getId();
      expect(
        shallow(<LinkToBlockchain actionId={actionId} type="action" />)
      ).toMatchSnapshot();
    });
  });
});
