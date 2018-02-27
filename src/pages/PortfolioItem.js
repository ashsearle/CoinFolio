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
import PortfolioCard from '../components/cards/PortfolioCard';
import PortfolioTotalCard from '../components/cards/PortfolioTotalCard';
import PortfolioCostTotalCard from '../components/cards/PortfolioCostTotalCard';
import PortfolioProfitCard from '../components/cards/PortfolioProfitCard';
import PortfolioCoins from '../components/portfolio/PortfolioCoins';
import PortfolioChart from '../components/charts/PortfolioChart';

import { formatCurrency } from '../utils/currency';
import { getPortfolio24hChange } from '../utils/portfolio';
import { getChangeTextClassName } from '../utils/format';

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
          key: 'type',
          sorter: (a, b) => {
            if (a.type < b.type) return -1;
            if (a.type > b.type) return 1;
            return 0;
          }
        },
        {
          title: 'Coin',
          dataIndex: 'coin',
          key: 'coin',
          sorter: (a, b) => {
            if (a.coin < b.coin) return -1;
            if (a.coin > b.coin) return 1;
            return 0;
          },
          render: text => {
            return text ? text.toUpperCase() : '-';
          }
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          sorter: (a, b) => a.amount - b.amount,
          render: text => {
            return text ? text : '-';
          }
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          sorter: (a, b) => a.price - b.price,
          render: (text, record) => {
            return record.type === 'purchase' || record.type === 'cost'
              ? text
              : '-';
          }
        },
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
          sorter: (a, b) => {
            if (a.currency < b.currency) return -1;
            if (a.currency > b.currency) return 1;
            return 0;
          },
          render: text => text.toUpperCase()
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => {
            if (moment(a.date).isBefore(moment(b.date))) return -1;
            if (moment(a.date).isAfter(moment(b.date))) return 1;
            return 0;
          },
          render: text => moment(text).format('Do MMM YYYY')
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          sorter: (a, b) => {
            if (a.description < b.description) return -1;
            if (a.description > b.description) return 1;
            return 0;
          },
          render: text => {
            return text ? text : '-';
          }
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

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
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
                  <PortfolioCard
                    title="24h Change:"
                    value={formatCurrency(
                      this.props.user,
                      this.props.portfolio24hChange
                    )}
                    valueClassName={getChangeTextClassName(
                      this.props.portfolio24hChange
                    )}
                  />
                  <PortfolioCostTotalCard
                    onPortfolioCostCalculated={this.onPortfolioCostCalculated}
                    transactions={this.props.portfolio.transactions}
                  />
                  <PortfolioProfitCard
                    value={this.state.portfolioValue}
                    cost={this.state.portfolioCost}
                  />
                  <section className="col-12 rechart-container">
                    {this.props.portfolio.transactions &&
                    this.props.portfolio.transactions.length ? (
                      <PortfolioChart
                        transactions={this.props.portfolio.transactions}
                      />
                    ) : (
                      'Loading chart...'
                    )}
                  </section>
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

const mapStateToProps = (state, props) => {
  const currentPortfolio = state.portfolio.find(
    portfolioItem => portfolioItem.id === props.match.params.id
  );
  return {
    user: state.user,
    portfolio: currentPortfolio,
    portfolio24hChange: getPortfolio24hChange(state, currentPortfolio)
  };
};

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
