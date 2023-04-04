import React from 'react';
import { Line } from '@ant-design/plots';
import { Card } from 'antd';

export default function LineChart() {
  const config = {
    data: [
      { year: '1850', value: 24, category: 'Liquid fuel' },
      { year: '1850', value: 54, category: 'Solid fuel' },
      { year: '1850', value: 43, category: 'Gas fuel' },
      { year: '1850', value: 0, category: 'Cement production' },
      { year: '1850', value: 62, category: 'Gas flarinl' },
      { year: '1851', value: 23, category: 'Liquid fuel' },
      { year: '1851', value: 54, category: 'Solid fuel' },
      { year: '1851', value: 0, category: 'Gas fuel' },
      { year: '1851', value: 33, category: 'Cement production' },
      { year: '1851', value: 0, category: 'Gas flarinl' },
      { year: '1852', value: 0, category: 'Liquid fuel' },
      { year: '1852', value: 57, category: 'Solid fuel' },
      { year: '1852', value: 0, category: 'Gas fuel' },
      { year: '1852', value: 23, category: 'Cement production' },
      { year: '1852', value: 0, category: 'Gas flarinl' },
      { year: '1853', value: 0, category: 'Liquid fuel' },
      { year: '1853', value: 59, category: 'Solid fuel' },
      { year: '1853', value: 14, category: 'Gas fuel' },
      { year: '1853', value: 0, category: 'Cement production' },
      { year: '1853', value: 0, category: 'Gas flarinl' },
      { year: '1854', value: 0, category: 'Liquid fuel' },
      { year: '1854', value: 69, category: 'Solid fuel' },
      { year: '1854', value: 0, category: 'Gas fuel' },
      { year: '1854', value: 32, category: 'Cement production' },
      { year: '1854', value: 0, category: 'Gas flarinl' },
      { year: '1855', value: 11, category: 'Liquid fuel' },
      { year: '1855', value: 71, category: 'Solid fuel' },
      { year: '1855', value: 0, category: 'Gas fuel' },
      { year: '1855', value: 32, category: 'Cement production' },
      { year: '1855', value: 3, category: 'Gas flarinl' },
    ],
    height: 200,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  };

  return (
    <Card bordered={false} style={{ marginBottom: 10, flex: '1 1 auto' }}>
      <Line {...config} />
    </Card>
  );
}
