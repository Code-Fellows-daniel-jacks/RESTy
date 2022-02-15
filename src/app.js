import React from 'react';
import { useState } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/funIndex.jsx';
import Footer from './components/footer/funIndex.jsx';
import Form from './components/form/funIndex.jsx';
import Results from './components/results/funIndex.jsx';

function App(props) {

  let [state, setState] = useState(() => {
    return { data: null, requestParams: {} }
  });

  let callApi = (requestParams) => {
    // console.log('here', requestParams);
    const data = {
      count: 2,
      results: [
        { name: 'fake think 1', url: 'http://fakethings.com/1' },
        { name: 'fake think 2', url: 'http://fakethings.com/2' }
      ]
    }

    setState(prevState => {
      return { data: data, requestParams };
    })
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;