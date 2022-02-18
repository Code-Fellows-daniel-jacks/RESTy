import { useState } from 'react';
import './form.scss';

function Form(props) {

  const [method, setMethod] = useState(() => 'GET');
  const [url, setUrl] = useState(() => '');

  function handleSubmit(e) {
    e.preventDefault();
    let requestParams = {
      method: method,
      url: url,
      textArea: e.target.textInput && e.target.textInput.value,
    }
    props.handleApiCall(requestParams);
  }

  function handleClick(e) {
    e.preventDefault();
    setMethod(e.target.id.toUpperCase());
  }

  function handleUrl(e) {
    e.preventDefault();
    setUrl(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input data-testid="urlArea" name='url' type='text' onChange={handleUrl} />
          <button data-testid="GO" type="submit">GO!</button>
        </label>
        <label data-testid="methodInput" className="methods" name="methods" onClick={handleClick}>
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
