import { get, set } from './storageAdapter';

const AFSTEMNING_KEY = 'afstemning_';
const AKTØR_LIST_KEY = 'aktør_list';
const LATEST_AFSTEMNING_ID_KEY = 'latest_afstemning_id';

export function loadAfstemning(id: number): Afstemning | null {
  return get(`${AFSTEMNING_KEY}${id}`);
}

export function loadAktørList(): Aktør[] | null {
  return get(AKTØR_LIST_KEY);
}

export function loadLatestAfstemningId(): AfstemningId | null {
  return get(LATEST_AFSTEMNING_ID_KEY);
}

export function saveAfstemning(afstemning: Afstemning) {
  set(`${AFSTEMNING_KEY}${afstemning.id}`, afstemning);
}

export function saveAktørList(aktørList: Aktør[]) {
  set(AKTØR_LIST_KEY, aktørList);
}

export function saveLatestAfstemningId(afstemningId: AfstemningId) {
  set(LATEST_AFSTEMNING_ID_KEY, afstemningId);
}
