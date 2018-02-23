import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Modal, Popconfirm, Tabs } from 'antd';

import {
  startSetPortfolios,
  startAddTransaction,
  startEditTransaction,
  startRemoveTransaction
} from '../actions/portfolio';

import TransactionForm from '../components/forms/TransactionForm';
import PortfolioTotalCard from '../components/cards/PortfolioTotalCard';
import Portfolio24HChangeCard from '../components/cards/Portfolio24HChangeCard';
import PortfolioCostTotalCard from '../components/cards/PortfolioCostTotalCard';
import PortfolioProfitCard from '../components/cards/PortfolioProfitCard';
import PortfolioCoins from '../components/portfolio/PortfolioCoins';

const TabPane = Tabs.TabPane;

class PortfolioItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      portfolioValue: 0,
      portfolioCost: 0,
      transactionsTableColumns: [
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: 'Coin',
          dataIndex: 'coin',
          key: 'coin',
          render: text => text.toUpperCase()
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount'
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price'
        },
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
          render: text => text.toUpperCase()
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          render: text => moment(text).format('Do MMM YYYY')
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          render: (text, record) => {
            return (
              <div>
                <button
                  className="btn btn-link"
                  onClick={() => this.onTransactionEdit(record)}
                >
                  Edit
                </button>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => this.onTransactionDelete(record.id)}
                >
                  <button className="btn btn-link">Delete</button>
                </Popconfirm>
              </div>
            );
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.props.fetchPortfolio();
  }

  onTransactionEdit = transaction => {
    this.setState({
      editingTransaction: transaction,
      modalOpen: true
    });
  };

  onTransactionDelete = id => {
    this.props.removeTransaction(this.props.portfolio.id, id);
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      editingTransaction: null,
      modalOpen: false
    });
  };

  onPortfolioValueCalculated = portfolioValue => {
    this.setState({ portfolioValue });
  };

  onPortfolioCostCalculated = portfolioCost => {
    this.setState({ portfolioCost });
  };

  render() {
    return (
      <div>
        {this.state.modalOpen ? (
          <Modal
            title={
              (this.state.editingTransaction ? 'Edit' : 'Add') + ' Transaction'
            }
            visible={true}
            onCancel={this.closeModal}
            footer={null}
          >
            <TransactionForm
              transaction={this.state.editingTransaction}
              onSubmit={transaction => {
                if (this.state.editingTransaction) {
                  this.props.editTransaction(
                    this.props.portfolio.id,
                    this.state.editingTransaction.id,
                    transaction
                  );
                } else {
                  this.props.addTransaction(
                    this.props.portfolio.id,
                    transaction
                  );
                }
                this.closeModal();
              }}
            />
          </Modal>
        ) : null}
        <div className="container content">
          {this.props.portfolio ? (
            <div>
              <nav className="navbar">
                <h1>{this.props.portfolio.name}</h1>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.openModal}
                >
                  Add transaction
                </button>
              </nav>
              {this.props.portfolio.transactions &&
              this.props.portfolio.transactions.length ? (
                <div className="row">
                  <PortfolioTotalCard
                    onPortfolioValueCalculated={this.onPortfolioValueCalculated}
                    transactions={this.props.portfolio.transactions}
                  />
                  <Portfolio24HChangeCard
                    transactions={this.props.portfolio.transactions}
                  />
                  <PortfolioCostTotalCard
                    onPortfolioCostCalculated={this.onPortfolioCostCalculated}
                    transactions={this.props.portfolio.transactions}
                  />
                  <PortfolioProfitCard
                    value={this.state.portfolioValue}
                    cost={this.state.portfolioCost}
                  />
                  <section className="col-12">
                    <Tabs defaultActiveKey="1" size={'large'}>
                      <TabPane tab="Transactions" key="1">
                        <Table
                          rowKey={record => record.id}
                          dataSource={this.props.portfolio.transactions}
                          columns={this.state.transactionsTableColumns}
                        />
                      </TabPane>
                      <TabPane tab="Coins" key="2">
                        <PortfolioCoins
                          transactions={this.props.portfolio.transactions}
                        />
                      </TabPane>
                    </Tabs>
                  </section>
                </div>
              ) : (
                <div
                  className="alert alert-dark text-center pt-4 pb-4"
                  role="alert"
                >
                  <h4 className="alert-heading">Oh noes!</h4>
                  <p>You don't have any transactions in your portfolio.</p>
                  <button
                    className="btn btn-secondary"
                    onClick={this.openModal}
                  >
                    Add transaction
                  </button>
                </div>
              )}
            </div>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  portfolio: state.portfolio.find(
    portfolioItem => portfolioItem.id === props.match.params.id
  )
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolio: () => dispatch(startSetPortfolios()),
  addTransaction: (portfolioId, transaction) =>
    dispatch(startAddTransaction(portfolioId, transaction)),
  editTransaction: (portfolioId, transactionId, transaction) =>
    dispatch(startEditTransaction(portfolioId, transactionId, transaction)),
  removeTransaction: (portfolioId, transactionId) =>
    dispatch(startRemoveTransaction(portfolioId, transactionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItem);
