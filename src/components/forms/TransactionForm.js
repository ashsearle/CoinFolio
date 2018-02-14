import React, { Component } from 'react';

export default class TransactionForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      type: props.transaction ? props.transaction.type : 'purchase',
      coin: props.transaction ? props.transaction.coin : '',
      description: props.transaction ? props.transaction.description : '',
      errorState: false
    }
  }

  onTypeChange = (e) => {
    const type = e.target.value;
    this.setState(() => ({ type }));
  }

  onCoinChange = (e) => {
    const coin = e.target.value;
    this.setState(() => ({ coin }));
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.coin) {
      this.setState(() => ({ error: 'Please add a coin!' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        type: this.state.type,
        coin: this.state.coin,
        description: this.state.description
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
        <form
          onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputType">Type</label>
              <select
                id="inputType"
                className="form-control custom-select"
                value={this.state.type}
                onChange={this.onTypeChange}>
                  <option value="purchase">Purchase</option>
                  <option value="mining">Mining</option>
                  <option value="donation">Donation</option>
                  <option value="cost">Cost</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCoin">Coin</label>
              <select
                id="inputCoin"
                className="form-control custom-select"
                value={this.state.coin}
                onChange={this.onCoinChange}>
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                  <option value="ltc">LTC</option>
                  <option value="zcl">ZCL</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputName">Description</label>
            <textarea
              placeholder="Add a description for your portfolio (optional)"
              className="form-control"
              value={this.state.description}
              onChange={this.onDescriptionChange}>
            </textarea>
          </div>
          <button type="submit" className="btn btn-primary float-right">Submit</button>
        </form>
      </div>
    )
  }
}