import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const COLOR_GREEN = 'limegreen';
const COLOR_RED = 'crimson';
const COLOR_BLANK = 'dodgerblue';

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
        lineWidth={70}
        paddingAngle={2}
        radius={48}
        segmentsShift={2}
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
      color: COLOR_GREEN,
    },
    {
      value: voteSpread.blank,
      color: COLOR_BLANK,
    },
    {
      value: voteSpread.imod,
      color: COLOR_RED,
    },
  ];
}
