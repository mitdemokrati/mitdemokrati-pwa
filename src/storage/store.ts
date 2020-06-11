import { get, set } from './storageAdapter';

const AFSTEMNING_KEY = 'afstemning_';
const AFSTEMNING_LIST_KEY = 'afstemning_list';
const AKTØR_LIST_KEY = 'aktør_list';
const LATEST_AFSTEMNING_ID_KEY = 'latest_afstemning_id';

export function loadAfstemning(id: number): Afstemning | undefined {
  return get(`${AFSTEMNING_KEY}${id}`);
}

export function loadAfstemningList(): Afstemning[] | undefined {
  return get(AFSTEMNING_LIST_KEY);
}

export function loadAktørList(): Aktør[] | undefined {
  return get(AKTØR_LIST_KEY);
}

export function loadLatestAfstemningId(): AfstemningId | undefined {
  return get(LATEST_AFSTEMNING_ID_KEY);
}

export function saveAfstemning(afstemning: Afstemning) {
  set(`${AFSTEMNING_KEY}${afstemning.id}`, afstemning);
}

export function saveAfstemningList(afstemningList: Afstemning[]) {
  set(AFSTEMNING_LIST_KEY, afstemningList);
}

export function saveAktørList(aktørList: Aktør[]) {
  set(AKTØR_LIST_KEY, aktørList);
}

export function saveLatestAfstemningId(afstemningId: AfstemningId) {
  set(LATEST_AFSTEMNING_ID_KEY, afstemningId);
}
