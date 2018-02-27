import React, { Component } from 'react';

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area
} from 'recharts';

class PortfolioChart extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.length !== this.props.length;
  }
  render() {
    return (
      <ResponsiveContainer>
        <ComposedChart data={this.props.data}>
          <XAxis dataKey="date" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="total" fill="#eee" stroke="#ccc" />
          <Bar dataKey="cost" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default PortfolioChart;
