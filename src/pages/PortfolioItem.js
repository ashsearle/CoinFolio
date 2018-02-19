import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Modal, Popconfirm } from 'antd';
import _ from 'lodash';

import { 
  startSetPortfolios,
  startAddTransaction,
  startEditTransaction,
  startRemoveTransaction 
} from '../actions/portfolio';

import { fetchPrices } from '../actions/coins';

import TransactionForm from '../components/forms/TransactionForm';
import PortfolioTotalCard from '../components/cards/PortfolioTotalCard';
import Portfolio24HChangeCard from '../components/cards/Portfolio24HChangeCard';

class PortfolioItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      subscriptions: [],
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
              <button className="btn btn-link" onClick={() => this.onTransactionEdit(record)}>Edit</button>
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
    if (this.props.portfolio && this.props.portfolio.transactions && this.props.portfolio.transactions.length) {
      this.checkCoinsPrices(this.props.portfolio.transactions);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.portfolio.transactions && nextProps.portfolio.transactions.length) {
      this.checkCoinsPrices(nextProps.portfolio.transactions);
    }
  }

  checkCoinsPrices = (transactions) => {
    const coins = _.uniq(transactions.map((transaction) => transaction.coin.toUpperCase()));
    this.props.fetchPrices(coins);
  }

  /*
  shouldUpdateCoinsSubscriptions = (transactions) => {
    const coins = _.uniq(transactions.map((transaction) => transaction.coin.toUpperCase()));
    const subscriptions = [];
    const subscription = _.template('5~CCCAGG~<%= coin %>~<%= currency %>');
    coins.forEach((coin) => {
      subscriptions.push(
        subscription({
        coin: coin.toUpperCase(),
        currency: this.state.currency
      }))
    });
    this.props.handleSubscriptions(subscriptions);
  }
  */

  onTransactionEdit = (transaction) => {
    this.setState({
      editingTransaction: transaction,
      modalOpen: true
    });
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
          title={(this.state.editingTransaction ? 'Edit' : 'Add') + ' Transaction'}
          visible={this.state.modalOpen}
          onCancel={this.toggleModal}
          footer={null}
        >
          <TransactionForm
            transaction={this.state.editingTransaction}
            onSubmit={(transaction) => {
              if (this.state.editingTransaction) {
                this.props.editTransaction(this.props.portfolio.id, this.state.editingTransaction.id, transaction);
              } else {
                this.props.addTransaction(this.props.portfolio.id, transaction);
              }
              this.setState({
                editingTransaction: null,
                modalOpen: false
              });
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
                  ? <div className="row">
                      <PortfolioTotalCard transactions={this.props.portfolio.transactions}/>
                      <Portfolio24HChangeCard transactions={this.props.portfolio.transactions}/>
                      <section className="col-12">
                        <h3>Recent transactions</h3>
                        <hr />
                        <Table
                          rowKey={record => record.id}
                          dataSource={this.props.portfolio.transactions}
                          columns={this.state.transactionsTableColumns} />
                      </section>
                      
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
  fetchPrices: (coins) => dispatch(fetchPrices(coins)),
  addTransaction: (portfolioId, transaction) => dispatch(startAddTransaction(portfolioId, transaction)),
  editTransaction: (portfolioId, transactionId, transaction) => dispatch(startEditTransaction(portfolioId, transactionId, transaction)),
  removeTransaction: (portfolioId, transactionId) => dispatch(startRemoveTransaction(portfolioId, transactionId))
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);