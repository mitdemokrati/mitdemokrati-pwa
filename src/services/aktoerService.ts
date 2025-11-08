import { mapAktoer } from './maps/aktoerMap';
import { tryFetch } from './service';

const AKTOER_URL = encodeURI('https://oda.ft.dk/api/Aktoer(idPlaceholder)');

const AKTOER_PARTI_URL = encodeURI(
  'https://oda.ft.dk/api/AktoerAktoer?$filter=fraaktoerid eq aktoerIdPlaceholder and rolleid eq 15 and TilAktoer/typeid eq 4&$expand=TilAktoer&$select=TilAktoer/id,TilAktoer/navn&$orderby=TilAktoer/slutdato desc&$top=1'
);

export async function fetchAktoer(aktoerId: number): Promise<Aktoer> {
  const response = await tryFetch<Aktoer>(
    AKTOER_URL.replace('idPlaceholder', aktoerId.toString())
  );

  const { data } = response || {};

  if (!data) {
    return {} as Aktoer;
  }

  const mappedAktoer = mapAktoer(data);

  if (!mappedAktoer.parti) {
    mappedAktoer.parti = await fetchAktoerParti(mappedAktoer.id);
  }

  return mappedAktoer;
}

export async function fetchAktoerParti(
  aktoerId: number
): Promise<string | undefined> {
  const response = await tryFetch<{ value: [{ TilAktoer: { navn: string } }] }>(
    AKTOER_PARTI_URL.replace('aktoerIdPlaceholder', aktoerId.toString())
  );

  return response?.data?.value?.[0]?.TilAktoer?.navn;
}
