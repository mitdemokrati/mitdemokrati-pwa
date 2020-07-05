type Afstemning = FTEntity & {
  Sagstrin: Sagstrin;
  Møde: Møde;
  Stemme: Stemme[];
  'Stemme@odata.nextLink'?: string;
  forslagStillerId?: number;
  id: number;
  konklusion: string;
  previousAfstemningId?: AfstemningId;
  vedtaget: boolean;
};

type AfstemningId = {
  dato: string;
  id: number;
  sagsId: number;
};

type AfstemningStillerResponse = {
  value: {
    aktørid: number;
  }[];
};

type Aktør = FTEntity & {
  id: number;
  typeid: number;
  navn: string;
  fornavn: string;
  efternavn: string;
  biografi?: string;
  parti?: string;
};

type AktørPartyMap = Map<number, string>;

type ApplicationState = {
  afstemningMap: Map<number, Afstemning>;
  aktørMap: Map<number, Aktør>;
  latestAfstemningId?: AfstemningId;
};

type FTEntity = {
  shouldUpdate?: boolean;
  version?: number;
};

type LatestIdResponse = {
  value: {
    id: number;
    Møde: { dato: string };
    Sagstrin: { Sag: { id: number } };
  }[];
};

type Møde = {
  id: number;
  dato: string;
};

type PartyVoteSpread = {
  [party: string]: VoteSpread;
};

type Sag = {
  id: number;
  titel: string;
  resume: string;
};

type Sagstrin = {
  Sag: Sag;
  id: number;
};

type Stemme = {
  typeid: number;
  afstemningid: number;
  aktørid: number;
};

type StemmeResponse = {
  value: Stemme[];
  'odata.nextLink': string | undefined;
};

declare enum VoteTypeEnum {
  For,
  Imod,
  Blank,
  Fraværende,
}

type VoteSpread = {
  for: number;
  imod: number;
  blank: number;
  fraværende: number;
};
