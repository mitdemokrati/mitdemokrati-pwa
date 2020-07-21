import {
  fetchForslagStillerIdList,
  fetchLatestAfstemningList,
} from '../services/afstemningService';

type AfstemningMap = Map<number, Afstemning>;
type ApplicationState = {
  afstemningMap: AfstemningMap;
};
const state: ApplicationState = {
  afstemningMap: new Map(),
};

const AFSTEMNING_TO_FETCH = 15;

export const getState = () => state;

export const populateAfstemningList = async () => {
  const afstemningMap = await fetchLatestAfstemningList(AFSTEMNING_TO_FETCH);

  afstemningMap.forEach((afstemning) =>
    state.afstemningMap.set(afstemning.id, afstemning)
  );

  enrichAfstemningList();
};

async function enrichAfstemningList() {
  const afstemningWithForslagStillerMap = await getAfstemningForslagStiller(
    state.afstemningMap
  );

  state.afstemningMap = new Map(afstemningWithForslagStillerMap);
}

async function getAfstemningForslagStiller(afstemningMap: AfstemningMap) {
  const afstemningList = [...afstemningMap.values()];

  const missingForslagStillerList = afstemningList.filter(
    (afstemning) => !afstemning.forslagStillerId
  );

  if (missingForslagStillerList.length < 1) {
    return afstemningMap;
  }

  const sagIdList = missingForslagStillerList.map(
    (afstemning) => afstemning.sagId
  );

  const forslagStillerList = await fetchForslagStillerIdList(sagIdList);

  const forslagStillerMap: Map<number, number[]> = forslagStillerList.reduce(
    (map, forslagStiller) => {
      const afstemningForslagStillerList = map.get(forslagStiller.sagid) || [];

      map.set(forslagStiller.sagid, [
        ...afstemningForslagStillerList,
        forslagStiller.aktørid,
      ]);

      return map;
    },
    new Map()
  );

  const afstemningSagIdMap: AfstemningMap = afstemningList.reduce(
    (map, afstemning) => {
      map.set(afstemning.sagId, afstemning);
      return map;
    },
    new Map()
  );

  forslagStillerMap.forEach((forslagStillerIdList, sagid) => {
    const afstemning = afstemningSagIdMap.get(sagid)!;

    afstemning.forslagStillerId = forslagStillerIdList;

    afstemningSagIdMap.set(sagid, afstemning);
  });

  const newAfstemningMap: AfstemningMap = [
    ...afstemningSagIdMap.values(),
  ].reduce((map, afstemning) => {
    map.set(afstemning.id, afstemning);
    return map;
  }, new Map());

  return newAfstemningMap;
}
