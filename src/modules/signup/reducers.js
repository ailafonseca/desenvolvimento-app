import REDUCERS from "modules/reducersConstants";

const SIGNUPKEY = "_signup_saveadd";

const INITIAL_STATE = {
  isLoading: false,
  currentStage: 1,
  error: {},
  token: undefined,
  cnpjDetails: {},
  cep: {},
  usuario: undefined,
  empresa: undefined,
  intensao: undefined
};

const DEFAULT = JSON.parse(localStorage.getItem(SIGNUPKEY)) || INITIAL_STATE;

const SaveNewState = (state) => {
  localStorage.setItem(SIGNUPKEY, JSON.stringify(state));
  return state;
};

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case REDUCERS.EXTERNAL.CNPJ.BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case REDUCERS.EXTERNAL.CNPJ.SUCCESS:
      return {
        ...state,
        isLoading: false,
        cnpjDetails: { ...action.payload }
      };
    case REDUCERS.EXTERNAL.CNPJ.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload }
      };
    case REDUCERS.EXTERNAL.CEP.SUCCESS:
      return {
        ...state,
        isLoading: false,
        cep: { ...action.payload }
      };

    case REDUCERS.CADASTRO.USUARIO.SUCCESS:
      return SaveNewState({ ...state, currentStage: 2, token: action.payload.token });

    case REDUCERS.CADASTRO.EMPRESA.SUCCESS:
      return SaveNewState({ ...state, empresa: action.payload });

    case REDUCERS.CADASTRO.STAGE.SET:
      return SaveNewState({
        ...state,
        currentStage: action.payload
      });

    case REDUCERS.CADASTRO.STAGE.TOKEN:
      return SaveNewState({ ...state, token: action.payload });

    case REDUCERS.CADASTRO.STAGE.RESET:
      localStorage.removeItem(SIGNUPKEY);

      return {
        ...state,
        currentStage: 1
      };

    case REDUCERS.CADASTRO.CLEAN:
      localStorage.removeItem(SIGNUPKEY);
      return {};
    default:
      return state;
  }
}
