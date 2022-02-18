export const initialState = {
  data: null,
  rqstParams: {},
  loading: false,
  error: { status: false, message: '' },
}

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      console.log('working data');
      return { ...state, data: action.data };
    case 'SET_RQST_PARAMS':
      console.log('working params');
      return { ...state, rqstParams: action.rqstParams };
    case 'SET_LOADING':
      console.log('working loading');
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      console.log('working error');
      return { ...state, error: action.error };
    default:
      return state;
  }
}