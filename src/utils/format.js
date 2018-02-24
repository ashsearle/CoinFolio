import React from 'react';

export const formatPercentChange = text => {
  const className = +text > 0 ? 'text-success' : 'text-danger';
  return <span className={className}>{text}%</span>;
};

export const formatChangeTrend = (text, trend) => {
  if (trend) {
    const className = trend === 'up' ? 'text-success' : 'text-danger';
    return <span className={className}>{text}</span>;
  }
  return text;
};
