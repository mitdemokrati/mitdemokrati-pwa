export const parseValueFromBiography = (
  biography: string | undefined,
  value: string
): string => {
  if (!biography) {
    return '';
  }

  const valueStartKey = `<${value}>`;
  const valueEndKey = `</${value}>`;

  const partyIndex = biography.indexOf(valueStartKey);

  if (partyIndex === -1) {
    return '';
  }

  const startIndex = partyIndex + valueStartKey.length;
  const endIndex = biography.indexOf(valueEndKey);

  return biography.substring(startIndex, endIndex);
};
