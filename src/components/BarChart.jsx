import React from 'react';
import { Bar } from '@ant-design/plots';
import { Card } from 'antd';

export default function BarChart() {
  const data = [
    {
      year: '1951 年',
      value: 38,
    },
    {
      year: '1952 年',
      value: 52,
    },
    {
      year: '1956 年',
      value: 61,
    },
    {
      year: '1957 年',
      value: 145,
    },
    {
      year: '1958 年',
      value: 48,
    },
  ];
  const config = {
    data,
    xField: 'value',
    yField: 'year',
    height: 200,
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
  };
  return (
    <Card bordered={false} style={{ width: '49%' }}>
      <Bar {...config} />
    </Card>
  );
}
