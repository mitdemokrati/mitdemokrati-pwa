type Afstemning = FTEntity & {
  Sagstrin: Sagstrin;
  Møde: Møde;
  Stemme: Stemme[];
  'Stemme@odata.nextLink'?: string;
  forslagStillerId?: number;
  id: number;
  vedtaget: boolean;
};

type AfstemningId = {
  date: Date;
  id: number;
  sagsId: number;
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

type ApplicationState = {
  afstemningMap: Map<number, Afstemning>;
  aktørMap: Map<number, Aktør>;
  latestAfstemningId?: AfstemningId;
};

type FTEntity = {
  shouldUpdate?: boolean;
  version?: number;
};

type Møde = {
  id: number;
  dato: Date;
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

type AfstemningStillerResponse = {
  value: {
    aktørid: number;
  }[];
};

type LatestIdResponse = {
  value: {
    id: number;
    Møde: { dato: string };
    Sagstrin: { Sag: { id: number } };
  }[];
};
