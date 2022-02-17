import React, { useEffect } from 'react';
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

  let [data, setData] = useState(null)
  let [rqstParams, setRqstParams] = useState({})
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState({ status: false, message: '' });

  let callApi = async (requestParams) => {
    setLoading(true);
    setError(false);
    if (!requestParams.url) {
      setError(() => {
        return { status: true, message: 'Please ensure you filled out all data fields' }
      });
      setLoading(false);
      setData(null);
      return;
    }
    setRqstParams(requestParams);
  }

  useEffect(() => {
    async function getData() {
      let apiResponse;
      try {
        apiResponse = await axios({
          method: rqstParams.method.toLowerCase(),
          url: rqstParams.url,
          data: rqstParams.textArea
        })

        setTimeout(() => {
          setLoading(false);
        }, 2000);

        setData(apiResponse.data);
      } catch (e) {
        setLoading(false);
        setData(null);
        setError(() => {
          return { status: true, message: 'Error handling request, please try a different method or different URL' }
        });
        return
      }
    }

    getData();
  }, [rqstParams]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {rqstParams.method}</div>
      <div>URL: {rqstParams.url}</div>
      {error.status === true && <div>{error.message}</div>}  
      <Form handleApiCall={callApi} />
      {loading ? <Loader /> : <Results data={data} />}
      <Footer />
    </React.Fragment>
  );
}

export default App;