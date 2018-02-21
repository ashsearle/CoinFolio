import React, { Component } from "react";
import { connect } from "react-redux";

import { formatCurrency } from "../../utils/currency";

class PortfolioProfitCard extends Component {
  render() {
    return (
      <div className="mb-3 col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            <div>
              <h5 className="card-title">Profit:</h5>
              {this.props.value && this.props.cost ? (
                <h2
                  className={
                    "card-text " +
                    (this.props.value < this.props.cost
                      ? "text-danger"
                      : "text-success")
                  }
                >
                  {formatCurrency(
                    this.props.user,
                    this.props.value - this.props.cost
                  )}
                </h2>
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PortfolioProfitCard);
