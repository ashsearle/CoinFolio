import React, { Component } from 'react';

class SectionHeader extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.title !== this.props.title;
  }
  render() {
    return (
      <header className="navbar section-header">
        <h1 className="title">{this.props.title}</h1>
        {this.props.buttonLabel && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.props.onButtonClick}
          >
            {this.props.buttonLabel}
          </button>
        )}
      </header>
    );
  }
}

export default SectionHeader;
