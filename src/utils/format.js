import React from 'react';

export const getChangeTextClassName = number =>
  number < 0 ? 'text-danger' : number > 0 ? 'text-success' : '';

export const formatPercentChange = text => {
  return <span className={getChangeTextClassName(+text)}>{text}%</span>;
};

export const formatChangeTrend = (text, trend) => {
  if (trend) {
    const className = trend === 'up' ? 'text-success' : 'text-danger';
    return <span className={className}>{text}</span>;
  }
  return text;
};
