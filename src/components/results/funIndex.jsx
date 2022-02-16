function Results(props) {
  return (
    <section>
      {console.log(props.data)}
      <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section>
  );
}

export default Results;
