import axios from 'axios';

import { mapAfstemning } from './maps/afstemningMap';

const LATEST_AFSTEMNING_URL = encodeURI(
  'https://oda.ft.dk/api/Afstemning?$expand=Sagstrin/Sag,Møde,Stemme&$orderby=Møde/dato desc,id desc&$top=1&$filter=typeid eq 1'
);

const PREVIOUS_AFSTEMNING_URL = encodeURI(
  "https://oda.ft.dk/api/Afstemning?$expand=Sagstrin/Sag,Møde,Stemme&$orderby=Møde/dato desc,id desc&$top=1&$filter=typeid eq 1 and Møde/dato le DateTime'dateTimePlaceholder' and id lt idPlaceHolder"
);

const AFSTEMNING_STILLER_ID_URL = encodeURI(
  'https://oda.ft.dk/api/SagAktør?$select=aktørid,sagid&$filter=(rolleid eq 19 or rolleid eq 16) and (sagsIdPlaceholder)'
);

export const fetchLatestAfstemningList = async (count: number = 1) => {
  const { data } = await axios.request<FTResponse<FTAfstemning>>({
    url: LATEST_AFSTEMNING_URL.replace('top=1', `top=${count}`),
  });

  const ftAfstemningList = data.value;

  return Promise.all(
    ftAfstemningList.map((ftAfstemning) =>
      enrichAndParseAfstemning(ftAfstemning)
    )
  );
};

export const fetchPreviousAfstemningList = async (afstemning: Afstemning) => {
  const url = PREVIOUS_AFSTEMNING_URL.replace(
    'dateTimePlaceholder',
    afstemning.dato
  ).replace('idPlaceHolder', afstemning.id.toString());

  const { data } = await axios.request<FTResponse<FTAfstemning>>({
    url,
  });

  const ftAfstemningList = data.value;

  return Promise.all(
    ftAfstemningList.map((ftAfstemning) =>
      enrichAndParseAfstemning(ftAfstemning)
    )
  );
};

export const fetchForslagStillerIdList = async (sagsIdList: number[]) => {
  const sagIdMatchString = sagsIdList.reduce((string, id, index) => {
    return index === 0 ? `sagid eq ${id}` : `${string} or sagid eq ${id}`;
  }, '');

  const { data } = await axios.request<AfstemningStillerResponse>({
    url: AFSTEMNING_STILLER_ID_URL.replace(
      'sagsIdPlaceholder',
      sagIdMatchString
    ),
  });

  return data?.value;
};

async function enrichAndParseAfstemning(ftAfstemning: FTAfstemning) {
  const stemmeList = await fetchStemmeList(
    ftAfstemning['Stemme@odata.nextLink']
  );

  return mapAfstemning({
    ...ftAfstemning,
    Stemme: [...ftAfstemning.Stemme, ...stemmeList.value],
  });
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
