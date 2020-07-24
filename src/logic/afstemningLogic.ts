import { fetchLatestAfstemningList } from '../services/afstemningService';
import { fetchForslagStillerIdList } from '../services/forslagStillerService';
import { mapArray } from '../utility/misc';

export const loadAfstemningList = async (count: number) => {
  return fetchLatestAfstemningList(count);
};

export const enrichAfstemningList = async (afstemningList: Afstemning[]) => {
  const forslagStillerList = await getAfstemningForslagStiller(afstemningList);

  return matchForslagStillerWithAfstemning(afstemningList, forslagStillerList);
};

async function getAfstemningForslagStiller(afstemningList: Afstemning[]) {
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
  forslagStillerList: { sagid: number; aktørid: number }[]
) {
  if (afstemningList.length < 1 || forslagStillerList.length < 1) {
    return afstemningList;
  }

  // Map all forslagStillerIds to sagId
  const forslagStillerMap: Map<number, number[]> = forslagStillerList.reduce(
    (map, forslagStiller) => {
      const forslagStillerIdList = map.get(forslagStiller.sagid) || [];

      map.set(forslagStiller.sagid, [
        ...forslagStillerIdList,
        forslagStiller.aktørid,
      ]);

      return map;
    },
    new Map()
  );

  // Map afstemning to sagId
  const afstemningMap = mapArray(afstemningList, 'sagId') as Map<
    number,
    Afstemning
  >;

  // Update afstemning in map with forslagStillerIdList
  forslagStillerMap.forEach((forslagStillerIdList, sagid) => {
    const afstemning = afstemningMap.get(sagid)!;

    afstemning.forslagStillerId = forslagStillerIdList;

    afstemningMap.set(sagid, afstemning);
  });

  // Return list of afstemningMap values
  return Array.from(afstemningMap.values());
}
