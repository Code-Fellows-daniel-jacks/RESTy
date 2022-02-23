import ReactJson from 'react-json-view';
import './results.scss';

function Results(props) {
  return (
    <section className="results">
      <ReactJson src={props.data} theme={'summerfruit'} />
    </section>
  );
}

export default Results;
