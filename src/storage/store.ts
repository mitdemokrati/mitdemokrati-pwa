import { get, set } from './storageAdapter';

const AFSTEMNING_KEY = 'afstemning_';
const LATEST_AFSTEMNING_ID_KEY = 'latest_afstemning_id';

export function loadAfstemning(id: number): Afstemning | null {
  return get(`${AFSTEMNING_KEY}${id}`);
}

// TODO
export function loadAktørList(): Aktør[] | [] {}

export function loadLatestAfstemningId(): AfstemningId | null {
  return get(LATEST_AFSTEMNING_ID_KEY);
}

export function saveAfstemning(afstemning: Afstemning) {
  set(`${AFSTEMNING_KEY}${afstemning.id}`, afstemning);
}

export function saveLatestAfstemningId(afstemningId: AfstemningId) {
  set(LATEST_AFSTEMNING_ID_KEY, afstemningId);
}
