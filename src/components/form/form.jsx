import { useEffect, useState } from 'react';
import './form.scss';

function Form(props) {

  const [method, setMethod] = useState('GET');

  function handleSubmit(e) {
    e.preventDefault();
    let requestParams = {
      method: method,
      url: e.target.url.value,
      textArea: e.target.textInput && e.target.textInput.value,
    }
    props.handleApiCall(requestParams);
  }

  function handleClick(e) {
    setMethod(e.target.id.toUpperCase());
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' />
          <button data-testid="GO" type="submit">GO!</button>
        </label>
        <label className="methods" name="methods" onClick={handleClick}>
          <span data-testid="get" className={method === 'GET' ? "active" : null} id="get">GET</span>
          <span data-testid="post" className={method === 'POST' ? "active" : null} id="post">POST</span>
          <span data-testid="put" className={method === 'PUT' ? "active" : null} id="put">PUT</span>
          <span data-testid="delete" className={method === 'DELETE' ? "active" : null} id="delete">DELETE</span>
        </label>
        <label>
          {(method === 'POST' || method === 'PUT') && <textarea name='textInput'></textarea>}
        </label>
      </form>
    </>
  );
}

export default Form;
