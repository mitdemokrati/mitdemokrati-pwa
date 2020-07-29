const BLANK_KEY = 'hverken for eller imod stemte';
const FOR_KEY = 'for stemte';
const IMOD_KEY = 'imod stemte';
const TOTAL_VOTES = 179;
const NO_PARTY_LETTER = 'UFG';

export const parseVoteSpreadFromKonklusion = (
  konklusion: string
): VoteSpread => {
  const lowerCaseKonklusion = konklusion.toLowerCase();

  const forCount = parseSubstringNumber(lowerCaseKonklusion, FOR_KEY);

  const imodCount = parseSubstringNumber(lowerCaseKonklusion, IMOD_KEY);

  const blankCount = parseSubstringNumber(lowerCaseKonklusion, BLANK_KEY);

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

export const parsePartySpreadFromKonklusion = (konklusion: string) => {
  const lowerCaseKonklusion = konklusion.toLowerCase();

  const forPartyLetters = parseSubstringParty(lowerCaseKonklusion, FOR_KEY);

  const imodPartyLetters = parseSubstringParty(lowerCaseKonklusion, IMOD_KEY);

  const blankPartyLetters = parseSubstringParty(lowerCaseKonklusion, BLANK_KEY);

  return {
    for: forPartyLetters,
    imod: imodPartyLetters,
    blank: blankPartyLetters,
  };
};

function parseSubstringParty(string: string, key: string) {
  const keyStart = string.indexOf(key);

  const startIndex = string.indexOf('(', keyStart + key.length) + 1;
  if (startIndex < 1) {
    return [];
  }

  const endIndex = string.indexOf(')', startIndex + 1);

  const subString = string.substring(startIndex, endIndex);

  const partyLetters = splitStringIntoPartyLetters(subString);

  return partyLetters;
}

function parseSubstringNumber(string: string, key: string) {
  const subString = getSubstringKeyWithSpaces(string, key);

  const parsedCount = parseInt(subString, 10);

  return Number.isNaN(parsedCount) ? 0 : parsedCount;
}

function getSubstringKeyWithSpaces(string: string, key: string) {
  const keyStart = string.indexOf(key);
  const startIndex = string.indexOf(' ', keyStart + key.length);

  // Use space after startIndex or end of string as endIndex, respectively
  let endIndex = string.indexOf(' ', startIndex + 1);
  endIndex = endIndex !== -1 ? endIndex : string.length;

  return string.substring(startIndex, endIndex);
}

function splitStringIntoPartyLetters(string: string) {
  const [firstLetterListString, lastLetterString] = string.split('og');

  const partyLetterList = firstLetterListString.toUpperCase().trim().split(',');
  const lastLetter = lastLetterString?.toUpperCase().trim();

  return [...partyLetterList, lastLetter]
    .filter(Boolean)
    .map(capitalizeAndRelabelIndividuals)
    .map((letter) => letter.trim());
}

function capitalizeAndRelabelIndividuals(string: string) {
  if (!string.includes(NO_PARTY_LETTER)) {
    return string;
  }

  const capitalizedIndividual = capitalizeName(string);

  return replaceNoPartyLetter(capitalizedIndividual);
}

function capitalizeName(string: string) {
  return string.split(' ').map(capitalizeOnlyFirstLetter).join(' ');
}

function capitalizeOnlyFirstLetter(string: string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1).toLowerCase()}`;
}

function replaceNoPartyLetter(string: string) {
  return string.replace(`(${NO_PARTY_LETTER.toLowerCase()}`, ' (Løsgænger)');
}
