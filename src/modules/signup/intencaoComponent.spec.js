import React from "react";
import { mount } from "enzyme";
import IntencaoComponent from "./intencaoComponent";

const setUp = (props = {}) => {
  return mount(<IntencaoComponent {...props} />);
};

const findByTestAttr = (component, attr) => component.find(`[data-test='${attr}']`);
const findById = (component, id) => component.find(`[id='${id}']`);

describe("Intenção Component", () => {
  const defaultParamteter = {
    onSuccess: () => {},
    dispatch: () => {},
    isOng: false
  };

  let componentEmpresa = undefined;
  let componentOng = undefined;
  beforeEach(() => {
    componentEmpresa = setUp({
      ...defaultParamteter,
      isOng: false
    });
    componentOng = setUp({
      ...defaultParamteter,
      isOng: true
    });
  });

  it("Deve haver um formulário por padrão", () => {
    expect(componentEmpresa.find("form").length).toBe(1);
  });

  it("Deve exibir somente campos especificos de Empresa", () => {
    expect(findByTestAttr(componentEmpresa, "toggleCompra").length).toBe(1);
    expect(findByTestAttr(componentEmpresa, "toggleVenda").length).toBe(1);
    expect(findByTestAttr(componentEmpresa, "toggleDoar").length).toBe(1);
    expect(findByTestAttr(componentEmpresa, "toggleReceberDoacao").length).toBe(0);
  });

  it("Deve exibir somente campos especificos de ONG", () => {
    expect(findByTestAttr(componentOng, "toggleCompra").length).toBe(1);
    expect(findByTestAttr(componentOng, "toggleVenda").length).toBe(0);
    expect(findByTestAttr(componentOng, "toggleDoar").length).toBe(0);
    expect(findByTestAttr(componentOng, "toggleReceberDoacao").length).toBe(1);
  });
});
