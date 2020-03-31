export const parseParty = (biography: string | undefined): string => {
  const partyIndex = (biography || '').indexOf('<party>');

  if (partyIndex === -1 || !biography) {
    return '';
  }

  const startIndex = partyIndex + 7;
  const endIndex = biography.indexOf('</party>');

  return biography.substring(startIndex, endIndex);
};
