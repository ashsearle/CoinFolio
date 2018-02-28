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
          <Area
            type="monotone"
            dataKey="total"
            fill="#f4f4f4"
            stroke="#323237"
          />
          <Bar dataKey="cost" barSize={20} fill="#6d5eac" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default PortfolioChart;
