import { mapAktør } from './maps/aktørMap';
import { tryFetch } from './service';

const AKTØR_URL = encodeURI('https://oda.ft.dk/api/Aktør(idPlaceholder)');

const AKTØR_PARTI_URL = encodeURI(
  'https://oda.ft.dk/api/AktørAktør?$filter=fraaktørid eq aktørIdPlaceholder and rolleid eq 15 and TilAktør/typeid eq 4&$expand=TilAktør&$select=TilAktør/id,TilAktør/navn&$orderby=TilAktør/slutdato desc&$top=1'
);

export async function fetchAktør(aktørId: number): Promise<Aktør> {
  const response = await tryFetch<Aktør>(
    AKTØR_URL.replace('idPlaceholder', aktørId.toString())
  );

  const { data } = response || {};

  if (!data) {
    return {} as Aktør;
  }

  const mappedAktør = mapAktør(data);

  if (!mappedAktør.parti) {
    mappedAktør.parti = await fetchAktørParti(mappedAktør.id);
  }

  return mappedAktør;
}

export async function fetchAktørParti(
  aktørId: number
): Promise<string | undefined> {
  const response = await tryFetch<{ value: [{ TilAktør: { navn: string } }] }>(
    AKTØR_PARTI_URL.replace(encodeURI('aktørIdPlaceholder'), aktørId.toString())
  );

  return response?.data?.value[0].TilAktør.navn;
}
