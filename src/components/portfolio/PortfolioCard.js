import React, { Component } from 'react';
import _ from 'lodash';

class PortfolioCard extends Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.value, this.props.value);
  }
  render() {
    const { title, value, valueClassName } = this.props;
    return (
      <div className="mb-3 col-md-3">
        <div className="card">
          <div className="card-body">
            <div>
              <h3 className="card-title">{title}</h3>
              {value ? (
                <div
                  className={
                    'card-value' + (valueClassName ? ' ' + valueClassName : '')
                  }
                >
                  {value}
                </div>
              ) : (
                  <p className="card-text">Calculating...</p>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioCard;
