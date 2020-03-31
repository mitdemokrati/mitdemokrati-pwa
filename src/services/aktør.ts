import axios from 'axios';
import { mapAktør } from './maps/aktørMap';

const AKTØR_URL = 'https://oda.ft.dk/api/Aktør?$filter=(';

const AKTØR_PARTI_URL =
  'https://oda.ft.dk/api/AktørAktør?$filter=fraaktørid eq aktørIdPlaceholder and rolleid eq 15 and TilAktør/typeid eq 4&$expand=TilAktør&$select=TilAktør/id,TilAktør/navn&$orderby=TilAktør/slutdato desc&$top=1';

export const fetchAktørList = async (
  aktørIdList: number[]
): Promise<Aktør[]> => {
  const aktørListUrl = constructFetchUrlForAktørList(aktørIdList);

  const { data } = await axios.request<AktørResponse>({
    url: aktørListUrl
  });

  if (data['odata.nextLink']) {
    const { data: nextData } = await axios.request<AktørResponse>({
      url: data['odata.nextLink']
    });

    return [...data?.value, ...nextData?.value].map(mapAktør);
  }

  return data?.value.map(mapAktør);
};

export const fetchAktørParti = async (aktørId: number): Promise<string> => {
  const { data } = await axios.request<{
    value: [{ TilAktør: { navn: string } }];
  }>({
    url: AKTØR_PARTI_URL.replace('aktørIdPlaceholder', aktørId.toString())
  });

  return data?.value[0].TilAktør.navn;
};

function constructFetchUrlForAktørList(idList: number[]): string {
  const constructedUrl = idList.reduce((finalUrl, id, index) => {
    return index === idList.length - 1
      ? `${finalUrl}id eq ${id}`
      : `${finalUrl}id eq ${id} or `;
  }, AKTØR_URL);

  // Close parentheses from AKTØR_URL query
  return `${constructedUrl})`;
}
