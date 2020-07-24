import axios from 'axios';

import { mapAfstemning } from './maps/afstemningMap';

const LATEST_AFSTEMNING_URL = encodeURI(
  'https://oda.ft.dk/api/Afstemning?$expand=Sagstrin/Sag,Møde,Stemme&$orderby=Møde/dato desc,id desc&$top=1&$filter=typeid eq 1'
);

const PREVIOUS_AFSTEMNING_URL = encodeURI(
  "https://oda.ft.dk/api/Afstemning?$expand=Sagstrin/Sag,Møde,Stemme&$orderby=Møde/dato desc,id desc&$top=1&$filter=typeid eq 1 and Møde/dato le DateTime'dateTimePlaceholder' and id lt idPlaceHolder"
);

export const fetchLatestAfstemningList = async (count: number = 1) => {
  const url = LATEST_AFSTEMNING_URL.replace('top=1', `top=${count}`);

  return enrichedAfstemningResponse(url);
};

export const fetchPreviousAfstemningList = async (
  afstemning: Afstemning,
  count: number = 1
) => {
  const url = PREVIOUS_AFSTEMNING_URL.replace(
    'dateTimePlaceholder',
    afstemning.dato
  )
    .replace('idPlaceHolder', afstemning.id.toString())
    .replace('top=1', `top=${count}`);

  return enrichedAfstemningResponse(url);
};

async function enrichedAfstemningResponse(url: string) {
  const {
    data: { value: ftAfstemningList },
  } = await axios.request<FTResponse<FTAfstemning>>({
    url,
  });

  return Promise.all(
    ftAfstemningList.map((ftAfstemning) =>
      enrichAndParseAfstemning(ftAfstemning)
    )
  );
}

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
    const noData: FTResponse<Stemme> = { value: [], 'odata.nextLink': '' };
    return noData;
  }

  const { data } = await axios.request<FTResponse<Stemme>>({
    url: stemmeListUrl,
  });

  return data;
}
