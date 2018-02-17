import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Modal, Popconfirm } from 'antd';

import { 
  startSetPortfolios,
  startAddTransaction,
  startEditTransaction,
  startRemoveTransaction 
} from '../actions/portfolio';
import TransactionForm from '../components/forms/TransactionForm';
import PortfolioTotalCard from '../components/cards/PortfolioTotalCard'

class PortfolioItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      transactionsTableColumns: [{
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },{
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
        render: text => text.toUpperCase()
      }, {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
      }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      }, {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
        render: text => text.toUpperCase()
      }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: text => moment(text).format('Do MMM YYYY')
      }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => {
          return (
            <div>
              <button className="btn btn-link" onClick={() => this.onTransactionEdit(record.id)}>Edit</button>
              <Popconfirm title="Are you sure?" onConfirm={() => this.onTransactionDelete(record.id)}>
                <button className="btn btn-link">Delete</button>
              </Popconfirm>
            </div>
          );
        },
      }]
    };
  }

  componentDidMount() {
    this.props.fetchPortfolio();
  }

  onTransactionEdit = (id) => {
    console.log('onTransactionEdit', id);
  }

  onTransactionDelete = (id) => {
    this.props.removeTransaction(this.props.portfolio.id, id);
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="Add Transaction"
          visible={this.state.modalOpen}
          onCancel={this.toggleModal}
          footer={null}
        >
          <TransactionForm
            onSubmit={(transaction) => {
              this.props.addTransaction(this.props.portfolio.id, transaction);
              this.toggleModal();
            }}/>
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
                  ? <div>
                      <PortfolioTotalCard portfolioId={this.props.portfolio.id}/>
                      <Table
                        rowKey={record => record.id}
                        dataSource={this.props.portfolio.transactions}
                        columns={this.state.transactionsTableColumns} />
                    </div>
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
  addTransaction: (portfolioId, transaction) => dispatch(startAddTransaction(portfolioId, transaction)),
  editTransaction: (portfolioId, transactionId, transaction) => dispatch(startEditTransaction(portfolioId, transactionId, transaction)),
  removeTransaction: (portfolioId, transactionId) => dispatch(startRemoveTransaction(portfolioId, transactionId))
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);