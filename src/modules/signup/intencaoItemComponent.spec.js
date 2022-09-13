import React from "react";
import { mount } from "enzyme";
import IntencaoItemCompoment from "./intencaoItemCompoment";

const setUp = (props = {}) => {
  return mount(<IntencaoItemCompoment {...props} />);
};

const findByTestAttr = (component, attr) => component.find(`[data-test='${attr}']`);
const findById = (component, attr) => component.find(`[id='${attr}']`);

describe("Intenção Item Component", () => {
  let itemComponent = undefined;
  beforeEach(() => {
    itemComponent = setUp({
      id: 1,
      title: "asdf",
      onChange: () => {}
    });
  });

  it("Deve exibir somente campos especificos de Empresa", () => {});
});
