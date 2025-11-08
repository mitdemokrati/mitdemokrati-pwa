const BLANK_KEY = 'hverken for eller imod stemte';
const FOR_KEY = 'for stemte';
const IMOD_KEY = 'imod stemte';
const TOTAL_VOTES = 179;
const NO_PARTY_LETTER = 'UFG';

export const parseVoteSpreadFromKonklusion = (
  konklusion: string
): VoteSpread => {
  const lowerCaseKonklusionList = konklusion
    ?.toLowerCase()
    ?.split('\n')
    ?.map((line) => line?.trim?.() ?? '') ?? ['', '', '', ''];

  const forCount = parseSubstringNumber(lowerCaseKonklusionList[1], FOR_KEY);

  const imodCount = parseSubstringNumber(lowerCaseKonklusionList[2], IMOD_KEY);

  const blankCount = parseSubstringNumber(
    lowerCaseKonklusionList[3],
    BLANK_KEY
  );

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

  stemmeList.forEach(({ typeid }) => {
    switch (typeid) {
      case 1:
        voteSpread.for += 1;
        break;
      case 2:
        voteSpread.imod += 1;
        break;
      case 3:
        voteSpread.fraværende += 1;
        break;
      case 4:
        voteSpread.blank += 1;
        break;
      default:
        break;
    }
  });

  return voteSpread;
};

export const parsePartySpreadFromKonklusion = (
  konklusion: string
): PartySpread => {
  const lowerCaseKonklusion = konklusion.toLowerCase();

  const forSubString = lowerCaseKonklusion.substring(
    lowerCaseKonklusion.indexOf(FOR_KEY),
    lowerCaseKonklusion.indexOf(IMOD_KEY)
  );

  const imodSubString = lowerCaseKonklusion.substring(
    lowerCaseKonklusion.indexOf(IMOD_KEY),
    lowerCaseKonklusion.indexOf(BLANK_KEY)
  );

  const blankSubString = lowerCaseKonklusion.substring(
    lowerCaseKonklusion.indexOf(BLANK_KEY),
    lowerCaseKonklusion.length
  );

  const forPartyLetters = parseSubstringParty(forSubString, FOR_KEY);

  const imodPartyLetters = parseSubstringParty(imodSubString, IMOD_KEY);

  const blankPartyLetters = parseSubstringParty(blankSubString, BLANK_KEY);

  return {
    for: forPartyLetters,
    imod: imodPartyLetters,
    blank: blankPartyLetters,
  };
};

export const parsePartySpreadFromStemmeList = (
  stemmeList: Stemme[],
  aktoerMap: Map<number, Aktoer>
): PartySpread => {
  const result = {
    for: new Set<string>(),
    imod: new Set<string>(),
    blank: new Set<string>(),
  };

  stemmeList.forEach(({ aktoerid, typeid }) => {
    switch (typeid) {
      case 1:
        result.for.add(aktoerMap.get(aktoerid)?.parti || '');
        break;
      case 2:
        result.imod.add(aktoerMap.get(aktoerid)?.parti || '');
        break;
      case 4:
        result.blank.add(aktoerMap.get(aktoerid)?.parti || '');
        break;
      default:
        break;
    }
  });

  result.for.delete('');
  result.imod.delete('');
  result.blank.delete('');

  return {
    for: Array.from(result.for),
    imod: Array.from(result.imod),
    blank: Array.from(result.blank),
  };
};

function parseSubstringParty(string: string, key: string): string[] {
  if (!string?.includes(key)) {
    return [];
  }

  const keyStart = string.indexOf(key);

  const startIndex = string.indexOf('(', keyStart + key.length) + 1;
  const cutoffIndex = string.indexOf(',', keyStart + key.length);
  if (startIndex < 1 || (startIndex > cutoffIndex && cutoffIndex >= 0)) {
    return [];
  }

  const endIndex = string?.includes(')')
    ? string.lastIndexOf(')')
    : string.length;

  const subString = string.substring(startIndex, endIndex);

  const partyLetters = splitStringIntoPartyLetters(subString);

  return partyLetters;
}

function parseSubstringNumber(string: string, key: string) {
  if (!string?.includes(key)) {
    return 0;
  }

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
    .map((letter) => letter.trim())
    .map(capitalize)
    .map(replaceNoPartyLetter)
    .sort((a, b) => a.length - b.length);
}

function capitalize(string: string) {
  return string.length > 3
    ? string.split(' ').map(capitalizeNameAndParty).join(' ')
    : string.toUpperCase();
}

function capitalizeNameAndParty(string: string) {
  return string?.includes('(')
    ? string.toUpperCase()
    : `${string.slice(0, 1).toUpperCase()}${string.slice(1).toLowerCase()}`;
}

function replaceNoPartyLetter(string: string) {
  return string.replace(`(${NO_PARTY_LETTER})`, '(Løsgænger)');
}

export const sortAfstemning = (a: Afstemning, b: Afstemning): number => {
  const aDate = Date.parse(a.dato);
  const bDate = Date.parse(b.dato);

  if (aDate !== bDate) {
    return bDate - aDate;
  }

  return b.id - a.id;
};
