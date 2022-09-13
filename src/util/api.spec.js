import { Fetch } from './api'
import axios from 'axios'

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: 'data', status: 200 }))
}))

describe('API Fetch', () => {
  beforeEach(() => {})

  it('Deve executar função de 200 quando chamado', async (done) => {
    let success = false
    await Fetch({
      endpoint: 'https://olamundo.com.br',
      r200: (resp) => (success = true),
      eGeneric: () => expect(true).toBe(false)
    })

    expect(success).toBe(true)
    done()
  })
  /*
  it("Deve executar função de 204 quando chamado", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("https://olamundo.com.br").reply(204, { response: true });

    let success = false;
    await Fetch({
      endpoint: "https://olamundo.com.br",
      r204: (resp) => (success = true)
    });

    expect(success).toBe(true);
  });

  it("Deve executar timeout", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("https://olamundo.com.br").timeout();

    let success = false;
    await Fetch({
      endpoint: "https://olamundo.com.br",
      eTimeOut: (resp) => (success = true)
    });

    expect(success).toBe(true);
  }); */
})
