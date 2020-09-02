type Afstemning = {
  dato: string;
  forslagStillerId?: number[];
  id: number;
  konklusion: string;
  resume: string;
  sagId: number;
  stemmeList: Stemme[];
  titel: string;
  vedtaget: boolean;
};
type AfstemningMap = Map<number, Afstemning>;

type AfstemningId = {
  dato: string;
  id: number;
  sagsId: number;
};

type AfstemningStiller = {
  sagid: number;
  aktørid: number;
};

type Aktør = {
  id: number;
  typeid: number;
  navn: string;
  email?: string;
  fornavn: string;
  folketingLink?: string;
  efternavn: string;
  biografi?: string;
  parti?: string;
  photoUrl?: string;
  phoneNumber?: string;
  valgkreds?: string;
};
type AktørMap = Map<number, Aktør>;
type AktørPartyMap = Map<number, string>;

type ForslagStiller = {
  aktørid: number;
  sagid: number;
};

type FTAfstemning = {
  Sagstrin: FTSagstrin;
  Møde: FTMøde;
  Stemme: Stemme[];
  'Stemme@odata.nextLink'?: string;
  forslagStillerId?: number[];
  id: number;
  konklusion: string;
  previousAfstemningId?: AfstemningId;
  vedtaget: boolean;
};

type FTSag = {
  id: number;
  titel: string;
  titelkort: string;
  resume: string;
};

type FTSagstrin = {
  Sag: FTSag;
  id: number;
};

type FTResponse<T> = {
  value: T[];
  'odata.nextLink': string | undefined;
};

type LatestIdResponse = {
  value: {
    id: number;
    Møde: { dato: string };
    Sagstrin: { Sag: { id: number } };
  }[];
};

type FTMøde = {
  id: number;
  dato: string;
};

type Party = {
  letter: string;
  name: string;
};

type PartyVoteSpread = {
  [party: string]: VoteSpread;
};

type Stemme = {
  afstemningid: number;
  typeid: number;
  aktørid: number;
};

type VoteSpread = {
  for: number;
  imod: number;
  blank: number;
  fraværende: number;
};

declare module '*.png';
