import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startSetPortfolios, startAddTransaction } from '../actions/portfolio';
import TransactionForm from '../components/forms/TransactionForm';

import { 
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';
import ReactTable from 'react-table';

class PortfolioItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      transactionsTableColumns: [{
        Header: 'Type',
        accessor: 'type'
      },{
        Header: 'Coin',
        accessor: 'coin'
      }, {
        Header: 'Amount',
        accessor: 'amount'
      }, {
        Header: 'Price',
        accessor: 'price'
      }, {
        Header: 'Currency',
        accessor: 'currency'
      }, {
        Header: 'Date',
        accessor: 'date'
      }, {
        Header: 'Description',
        accessor: 'description'
      }]
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
            <TransactionForm
              onSubmit={(transaction) => {
                this.props.addTransaction(this.props.portfolio.id, transaction);
                this.toggleModal();
              }}/>
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
                  ? <ReactTable
                      data={this.props.portfolio.transactions}
                      columns={this.state.transactionsTableColumns} />
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
  fetchPortfolio: () => dispatch(startSetPortfolios()),
  addTransaction: (portfolioId, transaction) => dispatch(startAddTransaction(portfolioId, transaction))
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);