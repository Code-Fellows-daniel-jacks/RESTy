function Results(props) {
  return (
    <section className="results">
      <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section>
  );
}

export default Results;
