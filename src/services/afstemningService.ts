import axios from 'axios';

import { mapAfstemning } from './maps/afstemningMap';

const LATEST_AFSTEMNING_URL = encodeURI(
  'https://oda.ft.dk/api/Afstemning?$expand=Sagstrin/Sag,Møde,Stemme&$orderby=Møde/dato desc,id desc&$top=1&$filter=typeid eq 1'
);

const PREVIOUS_AFSTEMNING_URL = encodeURI(
  "https://oda.ft.dk/api/Afstemning?$expand=Sagstrin/Sag,Møde,Stemme&$orderby=Møde/dato desc,id desc&$top=1&$filter=typeid eq 1 and Møde/dato le DateTime'dateTimePlaceholder' and id lt idPlaceHolder"
);

const AFSTEMNING_STILLER_ID_URL = encodeURI(
  'https://oda.ft.dk/api/SagAktør?$filter=sagid eq sagsIdPlaceholder and (rolleid eq 19 or rolleid eq 16)&$select=aktørid'
);

export const fetchLatestAfstemning = async () => {
  const { data } = await axios.request<FTResponse<FTAfstemning>>({
    url: LATEST_AFSTEMNING_URL,
  });

  const ftAfstemning = data.value[0];

  return enrichAndParseAfstemning(ftAfstemning);
};

export const fetchPreviousAfstemning = async (afstemning: Afstemning) => {
  const url = PREVIOUS_AFSTEMNING_URL.replace(
    'dateTimePlaceholder',
    afstemning.dato
  ).replace('idPlaceHolder', afstemning.id.toString());

  const { data } = await axios.request<FTResponse<FTAfstemning>>({
    url,
  });

  const ftAfstemning = data.value[0];

  return enrichAndParseAfstemning(ftAfstemning);
};

async function enrichAndParseAfstemning(ftAfstemning: FTAfstemning) {
  const [forslagStillerId, stemmeData] = await fetchAdditionalAfstemningData(
    ftAfstemning
  );

  return mapAfstemning({
    ...ftAfstemning,
    Stemme: [...ftAfstemning.Stemme, ...stemmeData.value],
    forslagStillerId,
  });
}

async function fetchAdditionalAfstemningData(ftAfstemning: FTAfstemning) {
  return Promise.all([
    fetchForslagStillerId(ftAfstemning.Sagstrin.Sag.id),
    fetchStemmeList(ftAfstemning['Stemme@odata.nextLink']),
  ]);
}

async function fetchForslagStillerId(sagsId: number) {
  const { data } = await axios.request<AfstemningStillerResponse>({
    url: AFSTEMNING_STILLER_ID_URL.replace(
      'sagsIdPlaceholder',
      sagsId.toString()
    ),
  });

  return data?.value[0]?.aktørid;
}

async function fetchStemmeList(stemmeListUrl: string | undefined) {
  if (!stemmeListUrl) {
    const noData: StemmeResponse = { value: [], 'odata.nextLink': '' };
    return noData;
  }

  const { data } = await axios.request<StemmeResponse>({
    url: stemmeListUrl,
  });

  return data;
}
