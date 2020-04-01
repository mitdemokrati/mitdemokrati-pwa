import {
  fetchLatestAfstemningId,
  fetchForslagStillerId,
  fetchAfstemning
} from '../services/afstemning';
import { fetchAktør } from '../services/aktør';
import {
  loadLatestAfstemningId,
  saveLatestAfstemningId,
  loadAfstemning,
  saveAfstemning,
  loadAktørList,
  saveAktørList
} from '../storage/store';

const state: ApplicationState = {
  afstemningMap: new Map(),
  aktørMap: new Map()
};

export const getLatestAfstemning = async () => {
  populateStateFromStorage();

  const { id } = await getLatestAfstemningId();

  const afstemning = await getAfstemning(id);

  console.dir(afstemning);

  const aktørIdList = afstemning?.Stemme.map(stemme => stemme.aktørid) || [];

  const aktørList = await Promise.all(aktørIdList?.map(id => getAktør(id)));

  console.dir(aktørList);

  // const [afstemning, forslagStillerId] = await Promise.all([
  //   fetchAfstemning(id),
  //   fetchForslagStillerId(sagsId)
  // ]);

  // afstemning.forslagStillerId = forslagStillerId;

  // const fetchResponses = await Promise.all([
  //   fetchPreviousAfstemning(afstemning.id, afstemning.Møde.dato)
  // ...afstemning.Stemme.map(stemme => fetchAktør([stemme.aktørid]))
  // ]);

  // console.dir(fetchResponses);
};

async function getAfstemning(id: number) {
  let afstemning = state.afstemningMap.get(id);

  if (afstemning) {
    return afstemning;
  }

  afstemning = loadAfstemning(id) || undefined;

  if (afstemning) {
    state.afstemningMap.set(id, afstemning);
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

  saveAfstemning(afstemning);

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
    saveAktørList(Array.from(state.aktørMap.values()));
    return aktør;
  }
}

async function getLatestAfstemningId() {
  let afstemningId = state.latestAfstemningId;

  if (afstemningId) {
    return afstemningId;
  }

  afstemningId = loadLatestAfstemningId() || undefined;

  if (afstemningId) {
    state.latestAfstemningId = afstemningId;
    return afstemningId;
  }

  afstemningId = await fetchLatestAfstemningId();

  saveLatestAfstemningId(afstemningId);

  return afstemningId;
}

async function populateStateFromStorage() {
  state.latestAfstemningId = loadLatestAfstemningId() || undefined;

  const aktørList = loadAktørList();

  aktørList?.forEach(aktør => {
    state.aktørMap.set(aktør.id, aktør);
  });
}
