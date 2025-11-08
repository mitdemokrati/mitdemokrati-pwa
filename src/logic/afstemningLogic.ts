import {
  fetchLatestAfstemningList,
  fetchPreviousAfstemningList,
} from '../services/afstemningService';
import { fetchForslagStillerIdList } from '../services/forslagStillerService';
import { mapArray } from '../utility/misc';

export const loadAfstemningList = (count?: number): Promise<Afstemning[]> => {
  return fetchLatestAfstemningList(count);
};

export const loadPreviousAfstemningList = async (
  oldAfstemning: Afstemning,
  count?: number
): Promise<Afstemning[]> => {
  return fetchPreviousAfstemningList(oldAfstemning, count);
};

export const enrichAfstemningList = async (
  afstemningList: Afstemning[]
): Promise<Afstemning[]> => {
  const forslagStillerList = await getAfstemningForslagStiller(afstemningList);

  return matchForslagStillerWithAfstemning(afstemningList, forslagStillerList);
};

async function getAfstemningForslagStiller(
  afstemningList: Afstemning[]
): Promise<AfstemningStiller[]> {
  const missingForslagStillerList = afstemningList.filter(
    (afstemning) => !afstemning.forslagStillerId
  );

  if (missingForslagStillerList.length < 1) {
    return [];
  }

  const sagIdList = missingForslagStillerList.map(
    (afstemning) => afstemning.sagId
  );

  return fetchForslagStillerIdList(sagIdList);
}

function matchForslagStillerWithAfstemning(
  afstemningList: Afstemning[],
  forslagStillerList: ForslagStiller[]
) {
  if (afstemningList.length < 1 || forslagStillerList.length < 1) {
    return afstemningList;
  }

  // Map all forslagStillerIds to sagId
  const forslagStillerMap = getForslagStillerMap(forslagStillerList);

  // Map afstemning to sagId
  const afstemningMap = mapArray(afstemningList, 'sagId') as Map<
    number,
    Afstemning
  >;

  // Update afstemning in map with forslagStillerIdList
  forslagStillerMap.forEach((forslagStillerIdList, sagid) => {
    const afstemning = afstemningMap.get(sagid);

    if (!afstemning) {
      return;
    }

    afstemning.forslagStillerId = forslagStillerIdList;

    afstemningMap.set(sagid, afstemning);
  });

  return Array.from(afstemningMap.values());
}

function getForslagStillerMap(
  forslagStillerList: ForslagStiller[]
): Map<number, number[]> {
  return forslagStillerList.reduce((map, forslagStiller) => {
    const forslagStillerIdList = map.get(forslagStiller.sagid) || [];

    map.set(forslagStiller.sagid, [
      ...forslagStillerIdList,
      forslagStiller?.aktoerid,
    ]);

    return map;
  }, new Map());
}
