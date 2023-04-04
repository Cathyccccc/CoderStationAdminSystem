import React, { useState, useEffect } from 'react';
import LineChart from '../../components/LineChart';
import ColumnChart from '../../components/ColumnChart';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <LineChart />
      <ColumnChart />
      <BarChart />
      <PieChart />
    </div>
  );
}
