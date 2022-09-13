export default {
  get: jest.fn(() => {
    console.log("axios MOCK");
    Promise.resolve({ data: {} });
  }),
  default: jest.fn(() => {
    console.log("axios MOCK");
    Promise.resolve({ data: {} });
  })
};
