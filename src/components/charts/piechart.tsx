import React, { Suspense } from 'react';

// @ts-ignore
const Cell = React.lazy(() => import('recharts/lib/component/Cell'));
// @ts-ignore
const Pie = React.lazy(() => import('recharts/lib/polar/Pie'));
// @ts-ignore
const ReactPieChart = React.lazy(() => import('recharts/lib/chart/PieChart'));

type PieChartProps = {
  voteSpread: VoteSpread;
};
export const PieChart = ({ voteSpread }: PieChartProps) => {
  const pieChartData = getPieChartData(voteSpread);

  const pieChartCells = pieChartData.map((entry) => (
    <Cell key={`cell-${entry.name}`} fill={entry.color} />
  ));

  return (
    <Suspense fallback={<div className="loading" />}>
      <ReactPieChart width={300} height={300}>
        <Pie
          data={pieChartData}
          dataKey="value"
          label
          labelLine={false}
          innerRadius={10}
          outerRadius={40}
          paddingAngle={5}
          startAngle={90}
          endAngle={-270}
        >
          {pieChartCells}
        </Pie>
      </ReactPieChart>
    </Suspense>
  );
};

function getPieChartData(voteSpread: VoteSpread) {
  return [
    {
      name: 'For',
      value: voteSpread.for,
      color: 'forestgreen',
    },
    {
      name: 'Imod',
      value: voteSpread.imod,
      color: 'firebrick',
    },
    {
      name: 'Blank',
      value: voteSpread.blank,
      color: 'dodgerblue',
    },
    {
      name: 'Fravær',
      value: voteSpread.fraværende,
      color: 'dimgrey',
    },
  ];
}
