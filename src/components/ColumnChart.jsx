import React from 'react';
import { Column } from '@ant-design/plots';
import { Card } from 'antd';

export default function ColumnChart() {
  const data = [
    {
      type: '0-1 秒',
      value: 0.55,
    },
    {
      type: '1-3 秒',
      value: 0.21,
    },
    {
      type: '3-5 秒',
      value: 0.13,
    },
    {
      type: '5+ 秒',
      value: 0.11,
    },
  ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    height: 200,
    seriesField: '',
    color: ({ type }) => {
      if (type === '5+ 秒') {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    maxColumnWidth: 50,
    columnWidthRatio: 0.6,
  };

  return (
    <Card bordered={false} style={{ width: '49%' }}>
      <Column {...config} />
    </Card>
  );
}
