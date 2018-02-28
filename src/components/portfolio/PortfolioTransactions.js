import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import moment from 'moment';

class PortfolioTransactions extends Component {
  render() {
    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        className: 'text-align-left bold capitalize',
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
    ];
    return (
      <Table
        rowKey={record => record.coin}
        dataSource={this.props.data}
        columns={columns}
      />
    );
  }
}

export default PortfolioTransactions;
