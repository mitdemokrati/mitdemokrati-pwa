const BLANK_KEY = 'hverken for eller imod stemte';
const FOR_KEY = 'for stemte';
const IMOD_KEY = 'imod stemte';
const TOTAL_VOTES = 179;

export const parseVoteSpreadFromKonklusion = (
  konklusion: string
): VoteSpread => {
  const lowerCaseKonklusion = konklusion.toLowerCase();

  const blankCount = lowerCaseKonklusion.includes(BLANK_KEY)
    ? parseCountSubstring(lowerCaseKonklusion, BLANK_KEY)
    : 0;

  const forCount = lowerCaseKonklusion.includes(FOR_KEY)
    ? parseCountSubstring(lowerCaseKonklusion, FOR_KEY)
    : 0;

  const imodCount = lowerCaseKonklusion.includes(IMOD_KEY)
    ? parseCountSubstring(lowerCaseKonklusion, IMOD_KEY)
    : 0;

  const fraværendeCount = TOTAL_VOTES - blankCount - forCount - imodCount;

  return {
    for: forCount,
    imod: imodCount,
    blank: blankCount,
    fraværende: fraværendeCount,
  };
};

export const parseVoteSpreadFromStemmeList = (
  stemmeList: Stemme[]
): VoteSpread => {
  const voteSpread: VoteSpread = {
    for: 0,
    imod: 0,
    blank: 0,
    fraværende: 0,
  };

  stemmeList.forEach((stemme) => {
    switch (stemme.typeid) {
      case 1:
        voteSpread.for += 1;
        break;
      case 2:
        voteSpread.imod += 1;
        break;
      case 3:
        voteSpread.blank += 1;
        break;
      case 4:
        voteSpread.fraværende += 1;
        break;
      default:
        break;
    }
  });

  return voteSpread;
};

function parseCountSubstring(string: string, indexKey: string) {
  const keyStart = string.indexOf(indexKey);
  const startIndex = string.indexOf(' ', keyStart + indexKey.length);

  // Use space after startIndex or end of string as endIndex, respectively
  let endIndex = string.indexOf(' ', startIndex + 1);
  endIndex = endIndex !== -1 ? endIndex : string.length;

  const subString = string.substring(startIndex, endIndex);

  const parsedCount = parseInt(subString, 10);

  return Number.isNaN(parsedCount) ? 0 : parsedCount;
}