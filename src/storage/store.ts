import { get, set } from './storageAdapter';

const AFSTEMNING_KEY = 'afstemning_';
const AFSTEMNING_LIST_KEY = 'afstemning_list';
const AKTØR_LIST_KEY = 'aktør_list';
const LATEST_AFSTEMNING_ID_KEY = 'latest_afstemning_id';

export function loadAfstemning(id: number): FTAfstemning | undefined {
  return get(`${AFSTEMNING_KEY}${id}`);
}

export function loadAfstemningList(): FTAfstemning[] | undefined {
  return get(AFSTEMNING_LIST_KEY);
}

export function loadAktørList(): Aktør[] | undefined {
  return get(AKTØR_LIST_KEY);
}

export function loadLatestAfstemningId(): AfstemningId | undefined {
  return get(LATEST_AFSTEMNING_ID_KEY);
}

export function saveAfstemning(afstemning: FTAfstemning) {
  set(`${AFSTEMNING_KEY}${afstemning.id}`, afstemning);
}

export function saveAfstemningList(afstemningList: FTAfstemning[]) {
  set(AFSTEMNING_LIST_KEY, afstemningList);
}

export function saveAktørList(aktørList: Aktør[]) {
  set(AKTØR_LIST_KEY, aktørList);
}

export function saveLatestAfstemningId(afstemningId: AfstemningId) {
  set(LATEST_AFSTEMNING_ID_KEY, afstemningId);
}
