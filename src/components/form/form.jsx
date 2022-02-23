import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import './form.scss';

function Form({ dispatch }) {

  // these are used for local state within the form, and when we submit, we use the dispatch passed in from App in order to edit the App's state.

  const [method, setMethod] = useState(() => 'get');
  const [url, setUrl] = useState(() => '');
  const [textInput, setTextInput] = useState(() => '');

  function handleSubmit(e) {
    e.preventDefault();
    let requestParams = {
      method: method,
      url: url,
      textArea: textInput,
    }

    if (!requestParams.url) {
      dispatch({ type: 'SET_ERROR', error: { status: true, message: 'Please input an endpoint URL' } });
      dispatch({ type: 'SET_DATA', data: null });
      return;
    }

    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'SET_ERROR', error: { status: false } });
    dispatch({ type: 'SET_HISTORY', history: requestParams })
    dispatch({ type: 'SET_RQST_PARAMS', rqstParams: requestParams });
  }

  function handleClick(e) {
    e.preventDefault();
    setMethod(e.target.id);
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === 'url') {
      setUrl(e.target.value);
    } else if (e.target.name === 'textInput') {
      setTextInput(e.target.value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='urlArea'>
        <label>
          <div>URL: </div>
          <input data-testid="urlArea" name='url' type='text' onChange={handleChange} />
          <LoadingButton
            type="submit"
            // loading={loading}
            loadingIndicator="Loading..."
            variant="outlined"
          >
            Fetch data
          </LoadingButton>
        </label>
      </div>
        <label data-testid="methodInput" className="methods" name="methods" onClick={handleClick}>
        <Button data-testid="get" className={method === 'get' ? "active" : null} id="get">GET</Button>
        <Button data-testid="post" className={method === 'post' ? "active" : null} id="post">POST</Button>
        <Button data-testid="put" className={method === 'put' ? "active" : null} id="put">PUT</Button>
        <Button data-testid="delete" className={method === 'delete' ? "active" : null} id="delete">DELETE</Button>
        </label>
        <label>
        {(method === 'post' || method === 'put') && <textarea rows="10" cols="50" onChange={handleChange} name='textInput'></textarea>}
        </label>
    </form>
  );
}

export default Form;
