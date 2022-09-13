import React from "react";
import { mount } from "enzyme";
import { getProps, findFirst } from "util/testingHelper";
import ToggleButton from "./index";

const setUp = (props = {}) => {
  return mount(<ToggleButton {...props} />);
};

describe("Toggle Check Button Component", () => {
  const defaultParameters = {
    onChange: jest.fn(),
    id: "asdfjklkjlvbioasdf",
    value: false
  };
  let component = undefined;
  beforeEach(() => {
    component = setUp({ ...defaultParameters });
  });

  it("Deve haver um checkbox", () => {
    expect(component.find(`[type="checkbox"]`).length).toBe(1);
  });

  it("Deve preencher o id", () => {
    const props = getProps(component, `[type="checkbox"]`);
    expect(props.id).toEqual(defaultParameters.id);
  });

  it("Deve preencher corretamente o value false", () => {
    const p = {
      ...defaultParameters,
      value: false
    };
    const c = setUp(p);
    const props = getProps(c, `[type="checkbox"]`);
    expect(props.value).toBe(false);
  });

  it("Deve preencher corretamente o value true", () => {
    const p = {
      ...defaultParameters,
      value: true
    };
    const c = setUp(p);
    const props = getProps(c, `[type="checkbox"]`);
    expect(props.value).toBe(true);
  });

  it("Deve não chamar onChange sem click", () => {
    const onClickFake = jest.fn();
    const p = {
      ...defaultParameters,
      onChange: onClickFake
    };
    setUp(p);
    expect(onClickFake).not.toHaveBeenCalled();
  });

  it("Deve chamar onChange ao ocorrer um click com parametro correto", () => {
    const onClickFake = jest.fn();
    const p = {
      ...defaultParameters,
      onChange: onClickFake
    };
    const c = setUp(p);
    findFirst(c, `[type="checkbox"]`).simulate("change");
    expect(onClickFake.mock.calls.length).toBe(1);
  });
});
