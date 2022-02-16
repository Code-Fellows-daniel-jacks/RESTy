import React from 'react';
import { useState } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Form from './components/form/form.jsx';
import Results from './components/results/results.jsx';
import Loader from './components/loader/loader.jsx';

import axios from 'axios';

function App(props) {

  let [state, setState] = useState(() => {
    return { data: null, requestParams: {}, loading: false }
  });

  let callApi = async (requestParams) => {
    let apiResponse;
    setState(prevState => {
      return { ...prevState, loading: true }
    })

    try {
      apiResponse = await axios({
        method: requestParams.method.toLowerCase(),
        url: requestParams.url,
        data: requestParams.textArea
      })
      if (!apiResponse.data) throw new Error('error');

      setTimeout(() => {
        setState(prevState => {
          return { ...prevState, loading: false }
        })
      }, 2000);

    } catch (e) {
      console.log('ERROR', e);
      return
    }

    setState(prevState => {
      return { ...prevState, data: apiResponse.data, requestParams };
    })
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {state.loading ? <Loader /> : <Results data={state.data} />}
      <Footer />
    </React.Fragment>
  );
}

export default App;