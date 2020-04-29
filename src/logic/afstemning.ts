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

export async function getNewestAfstemningList(count: number) {
  populateStateFromStorage();

  let currentAfstemningId = await fetchLatestAfstemningId();

  let loopCount = count;
  while (currentAfstemningId && loopCount > 0) {
    const previousAfstemning = await getAfstemning(currentAfstemningId.id);

    if (!previousAfstemning) {
      return;
    }

    currentAfstemningId = previousAfstemning.previousAfstemningId!;
    loopCount -= 1;
  }

  saveAfstemningList(Array.from(state.afstemningMap.values()));

  return Array.from(state.afstemningMap.values())
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
}
async function getLatestAfstemning() {
  populateStateFromStorage();

  const { id } = await getLatestAfstemningId();

  const afstemning = await getAfstemning(id);

  const aktørIdList = afstemning?.Stemme.map((stemme) => stemme.aktørid) || [];
  await Promise.all(aktørIdList?.map((id) => getAktør(id)));

  saveAktørList(Array.from(state.aktørMap.values()));
  saveAfstemningList(Array.from(state.afstemningMap.values()));
}

async function getAfstemning(id: number) {
  let afstemning = state.afstemningMap.get(id);

  if (afstemning) {
    return afstemning;
  }

  afstemning = await fetchAfstemning(id);

  if (!afstemning) {
    console.error(Error(`Could not fetch afstemning ${id}`));
    return;
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

async function getAktør(id: number) {
  let aktør = state.aktørMap.get(id);

  if (aktør) {
    return aktør;
  }

  aktør = await fetchAktør(id);

  if (aktør) {
    state.aktørMap.set(aktør.id, aktør);
    return aktør;
  }
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
  afstemningList?.forEach((afstemning) => {
    state.afstemningMap.set(afstemning.id, afstemning);
  });

  const aktørList = loadAktørList();
  aktørList?.forEach((aktør) => {
    state.aktørMap.set(aktør.id, aktør);
  });
}
