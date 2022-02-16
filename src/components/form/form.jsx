import { useState } from 'react';
import './form.scss';

function Form(props) {

  const [state, setState] = useState(() => {
    return { method: 'GET' }
  });

  function handleSubmit(e) {
    e.preventDefault();
    let requestParams = {
      method: state.method,
      url: e.target.url.value,
      textArea: e.target.textInput && e.target.textInput.value,
    }
    props.handleApiCall(requestParams);
  }

  function handleClick(e) {
    setState(prevState => {
      return { ...prevState, method: e.target.id.toUpperCase() }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' />
          <button type="submit">GO!</button>
        </label>
        <label className="methods" name="methods" onClick={handleClick}>
          <span data-testid="get" className={Object.values(state).includes('GET') ? "active" : null} id="get">GET</span>
          <span data-testid="post" className={Object.values(state).includes('POST') ? "active" : null} id="post">POST</span>
          <span data-testid="put" className={Object.values(state).includes('PUT') ? "active" : null} id="put">PUT</span>
          <span data-testid="delete" className={Object.values(state).includes('DELETE') ? "active" : null} id="delete">DELETE</span>
        </label>
        <label>
          {(state.method === 'POST' || state.method === 'PUT') && <textarea name='textInput'></textarea>}
        </label>
      </form>
    </>
  );
}

export default Form;
