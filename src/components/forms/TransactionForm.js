import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class TransactionForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      type: props.transaction ? props.transaction.type : 'purchase',
      coin: props.transaction ? props.transaction.coin : 'btc',
      amount: props.transaction ? props.transaction.amount : '',
      price: props.transaction ? props.transaction.price : '',
      currency: props.transaction ? props.transaction.currency : 'usd',
      date: props.transaction ? moment(props.transaction.date) : moment(),
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

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onPriceChange = (e) => {
    const price = e.target.value;
    if (!price || price.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ price }));
    }
  }

  onCurrencyChange = (e) => {
    const currency = e.target.value;
    this.setState(() => ({ currency }));
  }

  onDateChange = (date) => {
    this.setState({ date });
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.type !== 'cost' && (!this.state.amount || !this.state.price)) {
      this.setState(() => ({ error: 'Please add an amount and a price!' }));
    }
    else if (this.state.type === 'cost' && !this.state.price) {
      this.setState(() => ({ error: 'Please add a price!' }));
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        type: this.state.type,
        coin: this.state.type !== 'cost' ? this.state.coin : '',
        amount: this.state.type !== 'cost' ? this.state.amount : '',
        price: this.state.price,
        currency: this.state.currency,
        date: this.state.date.toJSON(),
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
              <label htmlFor="inputPrice">Price</label>
              <input
                type="text"
                className="form-control"
                id="inputPrice"
                placeholder="Price"
                value={this.state.price}
                onChange={this.onPriceChange}/>
            </div>
          </div>
          {
            this.state.type !== 'cost' &&
            <div className="form-row">
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
              <div className="form-group col-md-6">
                <label htmlFor="inputAmount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAmount"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.onAmountChange}/>
              </div>
            </div>
          }
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCurrency">Currency</label>
              <select
                id="inputCurrency"
                className="form-control custom-select"
                value={this.state.currency}
                onChange={this.onCurrencyChange}>
                  <option value="gbp">GBP</option>
                  <option value="usd">USD</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputDate">Date</label>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onDateChange} />
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