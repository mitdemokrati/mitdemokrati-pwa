import { mapAfstemning } from './maps/afstemningMap';
import axios from 'axios';
import { parseAfstemningId } from '../utility/parseAfstemningId';

const LATEST_AFSTEMNING_ID_URL =
  'https://oda.ft.dk/api/Afstemning?$expand=Møde,Sagstrin/Sag&$orderby=Møde/dato desc,id desc&$top=1&$select=id,Møde/dato,Sagstrin/Sag/id&$filter=typeid eq 1';

const AFSTEMNING_URL =
  'https://oda.ft.dk/api/Afstemning(idPlaceholder)?$expand=Sagstrin/Sag,Møde,Stemme';

const AFSTEMNING_STILLER_ID_URL =
  'https://oda.ft.dk/api/SagAktør?$filter=sagid eq sagsIdPlaceholder and (rolleid eq 19 or rolleid eq 16)&$select=aktørid';

const PREVIOUS_AFSTEMNING_URL =
  "https://oda.ft.dk/api/Afstemning?$expand=Møde,Sagstrin/Sag&$orderby=Møde/dato desc,id desc&$top=1&$select=id,Møde/dato,Sagstrin/Sag/id&$filter=typeid eq 1 and Møde/dato le DateTime'dateTimePlaceholder' and id lt idPlaceholder";

export const fetchAfstemning = async (
  afstemningId: number
): Promise<Afstemning> => {
  const { data } = await axios.request<Afstemning>({
    url: AFSTEMNING_URL.replace('idPlaceholder', afstemningId.toString()),
  });

  const forslagStillerIdPromise = fetchForslagStillerId(data.Sagstrin.Sag.id);
  const previousAfstemningIdPromise = fetchPreviousAfstemning(
    data.id,
    data.Møde.dato
  );

  if (data['Stemme@odata.nextLink']) {
    const stemmeDataPromise = axios.request<StemmeResponse>({
      url: data['Stemme@odata.nextLink'],
    });

    const [
      { data: stemmeData },
      forslagStillerId,
      previousAfstemningId,
    ] = await Promise.all([
      stemmeDataPromise,
      forslagStillerIdPromise,
      previousAfstemningIdPromise,
    ]);

    return mapAfstemning({
      ...data,
      Stemme: [...data.Stemme, ...stemmeData.value],
      forslagStillerId,
      previousAfstemningId,
    });
  }

  const [forslagStillerId, previousAfstemningId] = await Promise.all([
    forslagStillerIdPromise,
    previousAfstemningIdPromise,
  ]);

  return mapAfstemning({
    ...data,
    forslagStillerId,
    previousAfstemningId,
  });
};

export const fetchForslagStillerId = async (
  sagsId: number
): Promise<number> => {
  const { data } = await axios.request<AfstemningStillerResponse>({
    url: AFSTEMNING_STILLER_ID_URL.replace(
      'sagsIdPlaceholder',
      sagsId.toString()
    ),
  });

  return data?.value[0]?.aktørid;
};

export const fetchLatestAfstemningId = async (): Promise<AfstemningId> => {
  const { data } = await axios.request<LatestIdResponse>({
    url: LATEST_AFSTEMNING_ID_URL,
  });

  return parseAfstemningId(data);
};

export const fetchPreviousAfstemning = async (
  afstemningId: number,
  afstemningDate: string
): Promise<AfstemningId> => {
  const { data } = await axios.request<LatestIdResponse>({
    url: PREVIOUS_AFSTEMNING_URL.replace(
      'dateTimePlaceholder',
      afstemningDate
    ).replace('idPlaceholder', afstemningId.toString()),
  });

  return parseAfstemningId(data);
};
