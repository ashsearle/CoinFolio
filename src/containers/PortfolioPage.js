import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import PortfolioForm from '../components/portfolio/PortfolioForm';
import PortfolioList from '../components/portfolio/PortfolioList';

import {
  startSetPortfolios,
  startAddPortfolio,
  startEditPortfolio,
  startRemovePortfolio
} from '../actions/portfolio';

class PortfolioPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentDidMount() {
    this.props.fetchPortfolio();
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    return (
      <div className="container content">
        <nav className="navbar">
          <h1>Portfolio</h1>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.toggleModal}
          >
            Add portfolio
          </button>
        </nav>

        <Modal
          title="Add portfolio"
          visible={this.state.modalOpen}
          onCancel={this.toggleModal}
          footer={null}
        >
          <PortfolioForm
            onSubmit={portfolio => {
              this.props.createPortfolio(portfolio);
              this.toggleModal();
            }}
          />
        </Modal>

        {this.props.portfolio.length ? (
          <PortfolioList
            portfolio={this.props.portfolio}
            onPortfolioEdit={(id, data) => this.props.editPortfolio(id, data)}
            onPortfolioDelete={id => this.props.deletePortfolio(id)}
          />
        ) : (
          <div className="alert alert-dark text-center pt-4 pb-4" role="alert">
            <h4 className="alert-heading">Oh noes!</h4>
            <p>You don't have any portfolio yet.</p>
            <hr />
            <p>
              You can add as many portfolios as you like, as soon as you have
              they will show here.
            </p>
            <button className="btn btn-secondary" onClick={this.toggleModal}>
              Add portfolio now
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolio: () => dispatch(startSetPortfolios()),
  createPortfolio: portfolio => dispatch(startAddPortfolio(portfolio)),
  editPortfolio: (id, data) => dispatch(startEditPortfolio(id, data)),
  deletePortfolio: id => dispatch(startRemovePortfolio(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage);
