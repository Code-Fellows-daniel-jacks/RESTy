import React, { useEffect, useReducer, useState } from 'react';
import { initialState, reducer } from './components/reducer/reducer.jsx';

import './app.scss';

import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Form from './components/form/form.jsx';
import Results from './components/results/results.jsx';
import Loader from './components/loader/loader.jsx';

import axios from 'axios';

function App(props) {
  let [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  let [rqstParams, setRqstParams] = useState();
  console.log(state);

  let callApi = (requestParams) => {
    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'SET_ERROR', error: { status: false } });
    if (!requestParams.url) {
      dispatch({ type: 'SET_ERROR', error: { status: true, message: 'Please ensure you fill out entire form' } });

      dispatch({ type: 'SET_LOADING', loading: false });
      dispatch({ type: 'SET_DATA', data: null });
      return;
    }
    dispatch({ type: 'SET_RQST_PARAMS', rqstParams: requestParams });
  }

  useEffect(() => {
    async function getData() {
      let apiResponse;
      try {
        console.log(state.rqstParams);
        apiResponse = await axios({
          method: state.rqstParams.method.toLowerCase(),
          url: state.rqstParams.url,
          data: state.rqstParams.textArea
        })

        setTimeout(() => {
          dispatch({ type: 'SET_LOADING', loading: false });
        }, 2500);

        dispatch({ type: 'SET_DATA', data: apiResponse.data });
      } catch (e) {
        console.log(e);
        dispatch({ type: 'SET_LOADING', loading: false });
        dispatch({ type: 'SET_DATA', data: null });
        dispatch({ type: 'SET_ERROR', error: { status: true, message: 'Error handling request, please try a different method or different URL' } });
        return
      }
    }

    getData();
  }, [rqstParams]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.rqstParams.method}</div>
      <div>URL: {state.rqstParams.url}</div>
      {state.error.status === true && <div>{state.error.message}</div>}  
      <Form handleApiCall={callApi} />
      {state.loading ? <Loader /> : <Results data={state.data} />}
      <Footer />
    </React.Fragment>
  );
}

export default App;