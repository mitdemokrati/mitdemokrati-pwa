import React from 'react';

type StemmeCountProps = {
  voteSpread: VoteSpread;
};
export const StemmeCount = ({ voteSpread }: StemmeCountProps) => {
  return (
    <div>
      {getStemmeCountElement('For', voteSpread.for)}
      {getStemmeCountElement('Imod', voteSpread.imod)}
      {getStemmeCountElement('Blank', voteSpread.blank)}
    </div>
  );
};

function getStemmeCountElement(label: string, count: number) {
  return count > 0 ? (
    <p>
      {label}: {count}
    </p>
  ) : null;
}
