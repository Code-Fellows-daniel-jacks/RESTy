import HistoryInstance from './historyInstance.jsx';

function History({ history, dispatch }) {
  return (
    <div className='history'>
      <h1>History</h1>
      {history.map((entry, idx) => {
        return <HistoryInstance key={idx + entry.url} entry={entry} dispatch={dispatch} />
      })}
    </div>
  )
}

export default History;