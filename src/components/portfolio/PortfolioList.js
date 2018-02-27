import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

import { formatDate } from '../../utils/dates';
import PortfolioForm from './PortfolioForm';

class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editing: null
    };
  }

  toggleModal = portfolio => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      editing: portfolio
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Edit portfolio"
          visible={this.state.modalOpen}
          onCancel={this.toggleModal}
          footer={null}
        >
          <PortfolioForm
            portfolio={this.state.editing}
            onSubmit={portfolio => {
              this.props.onPortfolioEdit(this.state.editing.id, portfolio);
              this.toggleModal();
            }}
            onDelete={() => {
              this.props.onPortfolioDelete(this.state.editing.id);
              this.toggleModal();
            }}
          />
        </Modal>
        <div className="row">
          {this.props.portfolio.map(portfolioItem => {
            return (
              <div key={portfolioItem.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-0">{portfolioItem.name}</h4>
                    <p>
                      <span className="badge badge-info">
                        {portfolioItem.currency.toUpperCase()}
                      </span>
                      <span className="badge badge-info ml-1">
                        {formatDate(portfolioItem.created)}
                      </span>
                    </p>
                    {portfolioItem.description && (
                      <p className="card-text">{portfolioItem.description}</p>
                    )}
                    <nav className="float-right">
                      <Link
                        to={`/portfolio/${portfolioItem.id}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={() => this.toggleModal(portfolioItem)}
                      >
                        Edit
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PortfolioList;
