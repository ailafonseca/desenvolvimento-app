import React from "react";
import { mount } from "enzyme";
import UsuarioComponent from "./usuarioComponent";

const setUp = (props = {}) => {
  return mount(<UsuarioComponent {...props} />);
};

const findByTestAttr = (component, attr) => component.find(`[data-test='${attr}']`);
const findById = (component, attr) => component.find(`[id='${attr}']`);

describe("Usuario Component", () => {
  let component = undefined;
  beforeEach(() => {
    component = setUp({
      onSuccess: () => {},
      onCancel: () => {},
      dispatch: () => {}
    });
  });

  it("Deve um formulário", () => {
    expect(component.find(".form").length).toBe(1);
  });

  it("Deve o campo nome", () => {
    expect(findById(component, "signupNome").length).not.toBe(0);
  });

  it("Deve o campo cpf", () => {
    expect(findById(component, "signupCpf").length).not.toBe(0);
  });

  it("Deve o campo e-mail", () => {
    expect(findById(component, "signupEmail").length).not.toBe(0);
  });

  it("Deve o campo data de nascimento", () => {
    expect(findById(component, "signupDataNascimento").length).not.toBe(0);
  });

  it("Deve o campo senha", () => {
    expect(findById(component, "signupSenha").length).not.toBe(0);
  });

  it("Deve o campo de confirmar senha", () => {
    expect(findById(component, "signupConfirmarSenha").length).not.toBe(0);
  });
});
