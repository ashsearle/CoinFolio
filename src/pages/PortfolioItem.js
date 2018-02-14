import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startSetPortfolios } from '../actions/portfolio';
import TransactionForm from '../components/forms/TransactionForm'

import { 
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';

class PortfolioItem extends Component {

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
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add transaction</ModalHeader>
          <ModalBody>
            <TransactionForm />
          </ModalBody>
        </Modal>
        <div className="container content">
          { 
            this.props.portfolio
            ? 
              <div>
                <nav className="navbar">
                  <h1>{this.props.portfolio.name}</h1>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.toggleModal}>
                    Add transaction
                  </button>
                </nav>
                {
                  this.props.portfolio.transactions && this.props.portfolio.transactions.length
                  ? 'yes'
                  : <div className="alert alert-dark text-center pt-4 pb-4" role="alert">
                      <h4 className="alert-heading">Oh noes!</h4>
                      <p>You don't have any transactions in your portfolio.</p>
                      <button className="btn btn-secondary" onClick={this.toggleModal}>Add transaction</button>
                    </div>
                }
              </div>
            : 'Loading...'
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  portfolio: state.portfolio.find((portfolioItem) => portfolioItem.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  fetchPortfolio: () => dispatch(startSetPortfolios())
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);