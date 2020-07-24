import { get, set } from './storageAdapter';

const AFSTEMNING_KEY = 'afstemning_';
const AFSTEMNING_LIST_KEY = 'afstemning_list';
const AKTØR_LIST_KEY = 'aktør_list';

export function loadAfstemningFromStorage(
  id: number
): FTAfstemning | undefined {
  return get(`${AFSTEMNING_KEY}${id}`);
}

export function loadAfstemningListFromStorage(): FTAfstemning[] {
  return get(AFSTEMNING_LIST_KEY) || [];
}

export function loadAktørListFromStorage(): Aktør[] {
  return get(AKTØR_LIST_KEY) || [];
}

export function saveAfstemningToStorage(afstemning: FTAfstemning) {
  set(`${AFSTEMNING_KEY}${afstemning.id}`, afstemning);
}

export function saveAfstemningListToStorage(afstemningList: FTAfstemning[]) {
  set(AFSTEMNING_LIST_KEY, afstemningList);
}

export function saveAktørListToStorage(aktørList: Aktør[]) {
  set(AKTØR_LIST_KEY, aktørList);
}
