export const initialState = {
  data: null,
  rqstParams: {},
  history: [],
  loading: false,
  error: { status: false, message: '' },
}

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.data };
    case 'SET_RQST_PARAMS':
      return { ...state, rqstParams: action.rqstParams };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_HISTORY':
      return { ...state, history: [...state.history, action.history] };
    default:
      return state;
  }
}