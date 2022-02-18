import HistoryInstance from './historyInstance.jsx';

function History({ history, dispatch }) {
  return (
    <>
      <h1>History</h1>
      {history.map((entry, idx) => {
        return <HistoryInstance key={idx + entry.url} entry={entry} dispatch={dispatch} />
      })}
    </>
  )
}

export default History;