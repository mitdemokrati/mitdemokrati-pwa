import React from 'react';

import './stemme.less';

type StemmeCountProps = {
  voteSpread: VoteSpread;
};
export const StemmeCount = ({ voteSpread }: StemmeCountProps): JSX.Element => {
  return (
    <div className="stemme-count">
      {getStemmeCountElement('For', voteSpread.for)}
      {getStemmeCountElement('Blank', voteSpread.blank)}
      {getStemmeCountElement('Imod', voteSpread.imod)}
    </div>
  );
};

function getStemmeCountElement(
  label: string,
  count: number
): JSX.Element | null {
  return count > 0 ? (
    <span>
      <b>{count}</b> {label}
    </span>
  ) : null;
}
