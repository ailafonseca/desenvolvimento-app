import { required } from "./validate";

it("Required deve retornar vazio para texto preenchido", () => {
  expect(required("tem texto")).toBe(undefined);
});

it("Required deve retornar erro para texto preenchido", () => {
  expect(required("")).not.toBe(undefined);
});
