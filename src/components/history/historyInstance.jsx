import { Component } from 'react';

export default class HistoryInstance extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick = (e) => {
    e.preventDefault();

    let requestParams = {
      method: this.props.entry.method,
      url: this.props.entry.url,
      textArea: this.props.entry.textInput,
    }

    if (!requestParams.url) {
      this.props.dispatch({ type: 'SET_ERROR', error: { status: true, message: 'Please input an endpoint URL' } });
      this.props.dispatch({ type: 'SET_DATA', data: null });
      return;
    }

    this.props.dispatch({ type: 'SET_LOADING', loading: true });
    this.props.dispatch({ type: 'SET_ERROR', error: { status: false } });
    this.props.dispatch({ type: 'SET_HISTORY', history: requestParams })
    this.props.dispatch({ type: 'SET_RQST_PARAMS', rqstParams: requestParams });
  }

  render() {
    return (
      <div key={this.props.entry.method} onClick={this.handleClick} className={(this.props.idx % 2 === 0) ? 'even' : 'odd'}>
        <div name='method' value={this.props.entry.method} >Method: {this.props.entry.method}</div>
        <div name='url' value={this.props.entry.url} >URL: {this.props.entry.url}</div>
        <div name='body' value={this.props.entry.body} >Body: {this.props.entry.textArea}</div>
      </div>
    )
  }
}