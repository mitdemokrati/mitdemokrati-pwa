import React from 'react';

import './stemme.less';

type StemmeCountProps = {
  voteSpread: VoteSpread;
};
export const StemmeCount = ({ voteSpread }: StemmeCountProps) => {
  return (
    <div className="stemme-count">
      {getStemmeCountElement('For', voteSpread.for)}
      {getStemmeCountElement('Blank', voteSpread.blank)}
      {getStemmeCountElement('Imod', voteSpread.imod)}
    </div>
  );
};

function getStemmeCountElement(label: string, count: number) {
  return count > 0 ? (
    <span>
      {label}: {count}
    </span>
  ) : null;
}
