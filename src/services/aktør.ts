import axios from 'axios';

import { mapAktør } from './maps/aktørMap';

const AKTØR_URL = encodeURI('https://oda.ft.dk/api/Aktør(idPlaceholder)');

const AKTØR_PARTI_URL = encodeURI(
  'https://oda.ft.dk/api/AktørAktør?$filter=fraaktørid eq aktørIdPlaceholder and rolleid eq 15 and TilAktør/typeid eq 4&$expand=TilAktør&$select=TilAktør/id,TilAktør/navn&$orderby=TilAktør/slutdato desc&$top=1'
);

export async function fetchAktør(aktørId: number): Promise<Aktør> {
  const { data } = await axios.request<Aktør>({
    url: AKTØR_URL.replace('idPlaceholder', aktørId.toString()),
  });

  const mappedAktør = mapAktør(data);

  if (!mappedAktør.parti) {
    mappedAktør.parti = await fetchAktørParti(mappedAktør.id);
  }

  return mappedAktør;
}

export async function fetchAktørParti(aktørId: number): Promise<string> {
  const { data } = await axios.request<{
    value: [{ TilAktør: { navn: string } }];
  }>({
    url: AKTØR_PARTI_URL.replace('aktørIdPlaceholder', aktørId.toString()),
  });

  return data?.value[0].TilAktør.navn;
}

// function constructFetchUrlForAktørList(idList: number[]): string {
//   const constructedUrl = idList.reduce((finalUrl, id, index) => {
//     return index === idList.length - 1
//       ? `${finalUrl}id eq ${id}`
//       : `${finalUrl}id eq ${id} or `;
//   }, AKTØR_URL);

//   // Close parentheses from AKTØR_URL query
//   return `${constructedUrl})`;
// }
