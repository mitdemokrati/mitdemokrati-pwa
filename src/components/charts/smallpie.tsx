import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const COLOR_FOR = '#7fb800';
const COLOR_IMOD = '#f6511d';
const COLOR_BLANK = '#00a6ed';

type SmallPieProps = {
  voteSpread: VoteSpread;
  size?: number;
};
export const SmallPie = React.memo(
  ({ voteSpread, size = 100 }: SmallPieProps) => {
    const data = getPieChartData(voteSpread);

    const pieChartStyle = { height: `${size}px`, width: `${size}px` };

    return (
      <PieChart
        data={data}
        lineWidth={66}
        startAngle={270}
        style={pieChartStyle}
      />
    );
  }
);

function getPieChartData(voteSpread: VoteSpread) {
  return [
    {
      value: voteSpread.for,
      color: COLOR_FOR,
    },
    {
      value: voteSpread.blank,
      color: COLOR_BLANK,
    },
    {
      value: voteSpread.imod,
      color: COLOR_IMOD,
    },
  ];
}
