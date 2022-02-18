function History({ history, dispatch }) {
  function handleSubmit(e) {
    console.log(e.target);
    e.preventDefault();
    let requestParams = {
      url: e.target.url,
      method: e.target.method,
      textArea: e.target.body,
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

  return (
    <>
      <h1>History</h1>
      {history.map(entry => {
        return (
          <>
            <form>
              <label name='method' value={entry.method} >Method: {entry.method}</label>
              <label name='url' value={entry.url} >URL: {entry.url}</label>
              <span name='body' value={entry.body} >Body: {entry.textArea}</span>
              <button onClick={() => {
                let requestParams = {
                  method: entry.method,
                  url: entry.url,
                  textArea: entry.body,
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
              }}>RERUN!</button>
            </form>
          </>
        )
      })}
    </>
  )
}

export default History;