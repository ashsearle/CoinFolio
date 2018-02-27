import React, { Component } from 'react';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.portfolio ? props.portfolio.name : '',
      currency: props.portfolio ? props.portfolio.currency : 'USD',
      description: props.portfolio ? props.portfolio.description : '',
      errorState: false
    };
  }

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onCurrencyChange = e => {
    const currency = e.target.value;
    this.setState(() => ({ currency }));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      this.setState(() => ({ error: 'Please add a name!' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name,
        currency: this.state.currency,
        description: this.state.description
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onNameChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCurrency">Currency</label>
              <select
                id="inputCurrency"
                className="form-control custom-select"
                value={this.state.currency}
                onChange={this.onCurrencyChange}
              >
                <option value="usd">USD</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputName">Description</label>
            <textarea
              placeholder="Add a description for your portfolio (optional)"
              className="form-control"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </div>
          <nav className="float-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={this.props.onDelete}
            >
              Delete
            </button>
          </nav>

          <div className="clearfix" />
        </form>
      </div>
    );
  }
}
