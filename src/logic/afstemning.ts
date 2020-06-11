import {
  fetchLatestAfstemningId,
  fetchForslagStillerId,
  fetchAfstemning,
} from '../services/afstemning';
import { fetchAktør } from '../services/aktør';
import {
  loadLatestAfstemningId,
  saveLatestAfstemningId,
  loadAktørList,
  saveAktørList,
  saveAfstemningList,
  loadAfstemningList,
} from '../storage/store';

const state: ApplicationState = {
  afstemningMap: new Map(),
  aktørMap: new Map(),
};

export async function getNewestAfstemningList(
  count: number
): Promise<Afstemning[]> {
  populateStateFromStorage();

  let currentAfstemningId = await fetchLatestAfstemningId();

  let loopCount = count;
  while (currentAfstemningId && loopCount > 0) {
    // await-in-loop part of current control flow
    // eslint-disable-next-line no-await-in-loop
    const previousAfstemning = await getAfstemning(currentAfstemningId.id);

    if (!previousAfstemning) {
      return [];
    }

    currentAfstemningId = previousAfstemning.previousAfstemningId!;
    loopCount -= 1;
  }

  saveAfstemningList(Array.from(state.afstemningMap.values()));

  return Array.from(state.afstemningMap.values())
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
}

// TODO: Rewrite logic flow at some point
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getLatestAfstemning() {
  populateStateFromStorage();

  const { id } = await getLatestAfstemningId();

  const afstemning = await getAfstemning(id);

  const aktørIdList = afstemning?.Stemme.map((stemme) => stemme.aktørid) || [];
  await Promise.all(aktørIdList?.map((aktørId) => getAktør(aktørId)));

  saveAktørList(Array.from(state.aktørMap.values()));
  saveAfstemningList(Array.from(state.afstemningMap.values()));
}

async function getAfstemning(id: number): Promise<Afstemning | undefined> {
  let afstemning = state.afstemningMap.get(id);

  if (afstemning) {
    return afstemning;
  }

  afstemning = await fetchAfstemning(id);

  if (!afstemning) {
    // TODO: Use better logging
    console.error(Error(`Could not fetch afstemning ${id}`));
    return undefined;
  }

  if (!afstemning.forslagStillerId) {
    const forslagStillerId = await fetchForslagStillerId(
      afstemning.Sagstrin.Sag.id
    );

    afstemning.forslagStillerId = forslagStillerId;
  }

  state.afstemningMap.set(afstemning.id, afstemning);

  return afstemning;
}

async function getAktør(id: number): Promise<Aktør | undefined> {
  let aktør = state.aktørMap.get(id);

  if (aktør) {
    return aktør;
  }

  aktør = await fetchAktør(id);

  if (aktør) {
    state.aktørMap.set(aktør.id, aktør);
    return aktør;
  }

  return undefined;
}

async function getLatestAfstemningId() {
  let afstemningId = state.latestAfstemningId;

  if (afstemningId) {
    return afstemningId;
  }

  afstemningId = loadLatestAfstemningId();

  if (afstemningId) {
    state.latestAfstemningId = afstemningId;
    return afstemningId;
  }

  afstemningId = await fetchLatestAfstemningId();

  state.latestAfstemningId = afstemningId;

  saveLatestAfstemningId(afstemningId);

  return afstemningId;
}

async function populateStateFromStorage() {
  state.latestAfstemningId = loadLatestAfstemningId();

  const afstemningList = loadAfstemningList();
  // eslint-disable-next-line no-unused-expressions
  afstemningList?.forEach((afstemning) => {
    state.afstemningMap.set(afstemning.id, afstemning);
  });

  const aktørList = loadAktørList();
  // eslint-disable-next-line no-unused-expressions
  aktørList?.forEach((aktør) => {
    state.aktørMap.set(aktør.id, aktør);
  });
}
