import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tabs } from 'antd';
import {
  startSetPortfolios,
  startAddTransaction,
  startEditTransaction,
  startRemoveTransaction
} from '../actions/portfolio';

import TransactionForm from '../components/transactions/TransactionForm';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import PortfolioCoins from '../components/portfolio/PortfolioCoins';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PortfolioTransactions from '../components/portfolio/PortfolioTransactions';
import SectionHeader from '../components/utils/SectionHeader';

import {
  getPortfolioTotalValue,
  getPortfolio24hChange,
  getPortfolioCost,
  getPortfolioChartData
} from '../utils/portfolio';
import { getPortfolioCoinsData } from '../utils/coins';
import { formatCurrency } from '../utils/currency';
import { getChangeTextClassName } from '../utils/format';

const TabPane = Tabs.TabPane;

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
        <div className="content-wrapper">
          <div className="container-fluid portfolio-single">
            {this.props.portfolio ? (
              <div>
                <SectionHeader
                  title={this.props.portfolio.name}
                  buttonLabel="Add transaction"
                  onButtonClick={this.openModal}
                />

                {this.props.portfolio.transactions &&
                this.props.portfolio.transactions.length ? (
                  <div className="row">
                    <PortfolioCard
                      title="Value:"
                      value={formatCurrency(
                        this.props.user,
                        this.props.portfolioTotalValue
                      )}
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
                    <PortfolioCard
                      title="Investment:"
                      value={formatCurrency(
                        this.props.user,
                        this.props.portfolioCost
                      )}
                    />
                    <PortfolioCard
                      title="Profit:"
                      value={formatCurrency(
                        this.props.user,
                        this.props.portfolioTotalValue -
                          this.props.portfolioCost
                      )}
                      valueClassName={getChangeTextClassName(
                        this.props.portfolioTotalValue -
                          this.props.portfolioCost
                      )}
                    />
                    <section className="rechart-container col-12 mt-1">
                      <PortfolioChart data={this.props.portfolioChartData} />
                    </section>
                    <section className="col-12">
                      <Tabs defaultActiveKey="1" size={'large'}>
                        <TabPane tab="Transactions" key="1">
                          <PortfolioTransactions
                            data={this.props.portfolio.transactions}
                            onTransactionEdit={transaction =>
                              this.onTransactionEdit(transaction)
                            }
                            onTransactionDelete={id =>
                              this.onTransactionDelete(id)
                            }
                          />
                        </TabPane>
                        <TabPane tab="Coins" key="2">
                          <PortfolioCoins
                            user={this.props.user}
                            data={this.props.portfolioCoinsData}
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
    portfolio24hChange: getPortfolio24hChange(state, currentPortfolio),
    portfolioTotalValue: getPortfolioTotalValue(state, currentPortfolio),
    portfolioCost: getPortfolioCost(state, currentPortfolio),
    portfolioChartData: getPortfolioChartData(state, currentPortfolio),
    portfolioCoinsData: getPortfolioCoinsData(state, currentPortfolio)
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
