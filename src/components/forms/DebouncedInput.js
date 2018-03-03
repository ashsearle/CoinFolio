import React, { Component } from 'react';
import _ from 'lodash';

class DebouncedInput extends Component {
  constructor(props) {
    super(props);
    this.debounce = _.debounce(this.debounce, 400);
  }
  debounce = value => {
    this.props.onChange(value);
  };
  handleChange = e => {
    this.debounce(e.target.value);
  };
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }
  render() {
    return (
      <input
        type={this.props.type || 'text'}
        className="form-control"
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default DebouncedInput;
