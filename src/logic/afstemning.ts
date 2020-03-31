import { parseParty } from './../utility/parseParty';
import {
  fetchLatestAfstemningId,
  fetchForslagStillerId,
  fetchAfstemning
} from '../services/afstemning';
import { fetchAktørList } from '../services/aktør';
import {
  loadLatestAfstemningId,
  saveLatestAfstemningId,
  loadAfstemning,
  saveAfstemning
} from '../storage/store';

export const getLatestAfstemning = async () => {
  const { date, id, sagsId } = await getLatestAfstemningId();

  const afstemning = await getAfstemning(id);

  // const [afstemning, forslagStillerId] = await Promise.all([
  //   fetchAfstemning(id),
  //   fetchForslagStillerId(sagsId)
  // ]);

  // afstemning.forslagStillerId = forslagStillerId;

  console.dir(afstemning);

  // const fetchResponses = await Promise.all([
  //   fetchPreviousAfstemning(afstemning.id, afstemning.Møde.dato)
  // ...afstemning.Stemme.map(stemme => fetchAktørList([stemme.aktørid]))
  // ]);

  // console.dir(fetchResponses);
};

async function getAfstemning(id: number) {
  let afstemning = loadAfstemning(id);

  if (afstemning) {
    return afstemning;
  }

  afstemning = await fetchAfstemning(id);

  if (!afstemning.forslagStillerId) {
    const forslagStillerId = await fetchForslagStillerId(
      afstemning.Sagstrin.Sag.id
    );

    afstemning.forslagStillerId = forslagStillerId;
  }

  saveAfstemning(afstemning);

  return afstemning;
}

async function getLatestAfstemningId() {
  let afstemningId = loadLatestAfstemningId();

  if (afstemningId) {
    return afstemningId;
  }

  afstemningId = await fetchLatestAfstemningId();

  saveLatestAfstemningId(afstemningId);

  return afstemningId;
}
