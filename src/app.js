import React, { useEffect, useReducer, useRef } from 'react';
import { initialState, reducer } from './components/reducer/reducer.jsx';

import './app.scss';

import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Form from './components/form/form.jsx';
import History from './components/history/history.jsx';
import Results from './components/results/results.jsx';
import Loader from './components/loader/loader.jsx';

import axios from 'axios';

function App() {
  let [state, dispatch] = useReducer(reducer, initialState);

  const isMounted = useRef(false); // used to ensure our useEffect does not trigger on first mount
  useEffect(() => {
    if (isMounted.current) {
      async function getData() {
        let apiResponse;
        let dataToSend;

        try {
          if (state.rqstParams.textArea.length > 0 && (state.rqstParams.method === 'post' || state.rqstParams.method === 'put')) {
            dataToSend = JSON.parse(state.rqstParams.textArea)
          }

          apiResponse = await axios({
            method: state.rqstParams.method,
            url: state.rqstParams.url,
            data: { ...dataToSend }
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
    } else {
      isMounted.current = true;
    }
  }, [state.rqstParams]);

  return (
    <React.Fragment>
      <Header />
      <div className='prevRequest'>
        <div>Request Method: {state.rqstParams.method}</div>
        <div>URL: {state.rqstParams.url}</div>
        {state.error.status === true && <div>{state.error.message}</div>}  
      </div>
      <Form dispatch={dispatch} />
      <div className='dataContainer'>
        <History history={state.history} dispatch={dispatch} />
        {state.loading ? <Loader /> : <Results data={state.data} />}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;