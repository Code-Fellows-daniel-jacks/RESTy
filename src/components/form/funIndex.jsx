import { useState } from 'react';
import './form.scss';

function Form(props) {

  const [state, setState] = useState({ method: 'GET', url: 'https://pokeapi.co/api/v2/pokemon' })

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
          <span id="get">GET</span>
          <span id="post">POST</span>
          <span id="put">PUT</span>
          <span id="delete">DELETE</span>
        </label>
        <label>
          {(state.method === 'POST' || state.method === 'PUT') && <textarea name='textInput'></textarea>}
        </label>
      </form>
    </>
  );
}

export default Form;
