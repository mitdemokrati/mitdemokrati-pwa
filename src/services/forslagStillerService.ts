import { chunkArray, uniqueArray } from '../utility/misc';
import { tryFetch } from './service';

// More than this many ids, breaks the request
const MAX_ID_COUNT_IN_REQUEST = 18;

const AFSTEMNING_STILLER_ID_URL = encodeURI(
  'https://oda.ft.dk/api/SagAktør?$select=aktørid,sagid&$filter=(rolleid eq 19 or rolleid eq 16) and (sagsIdPlaceholder)'
);

export const fetchForslagStillerIdList = async (
  sagIdList: number[]
): Promise<AfstemningStiller[]> => {
  if (sagIdList.length < 1) {
    return [];
  }

  const sagIdListChunks = chunkArray(
    uniqueArray(sagIdList),
    MAX_ID_COUNT_IN_REQUEST
  );

  const sagIdResponses = await Promise.all(
    sagIdListChunks.map((sagIdChunk) =>
      fetchForslagStillerIdListChunk(sagIdChunk)
    )
  );

  return sagIdResponses.flat().filter(Boolean) as AfstemningStiller[];
};

async function fetchForslagStillerIdListChunk(sagIdList: number[]) {
  const sagIdMatchString = sagIdList.reduce((string, id, index) => {
    return index === 0 ? `sagid eq ${id}` : `${string} or sagid eq ${id}`;
  }, '');

  const response = await tryFetch<FTResponse<AfstemningStiller>>(
    AFSTEMNING_STILLER_ID_URL.replace('sagsIdPlaceholder', sagIdMatchString)
  );

  return response?.data?.value;
}
