import { fetchAktør } from '../services/aktørService';
import {
  loadAktørListFromStorage,
  saveAktørListToStorage,
} from '../storage/storage';
import { mapArray, uniqueArray, filterNotInMap } from '../utility/misc';

export const loadAktørList = async (aktørIdList: number[]) => {
  if (aktørIdList.length < 1) {
    return [];
  }

  const aktørList = (await loadAktørListFromStorage()) || [];

  const storedAktørMap = mapArray(aktørList, 'id') as Map<number, Aktør>;

  const missingAktørIdList = filterNotInMap(
    uniqueArray(aktørIdList),
    storedAktørMap
  );

  if (!missingAktørIdList || missingAktørIdList.length < 1) {
    return getFilteredValuesFromMap(aktørIdList, storedAktørMap);
  }

  const aktørListFromService = await getAktørListFromService(
    missingAktørIdList
  );

  // Add aktørList from service to map
  aktørListFromService.forEach((aktør) => storedAktørMap.set(aktør.id, aktør));

  // Update stored aktørList with new aktør
  saveAktørListToStorage(Array.from(storedAktørMap.values()));

  return getFilteredValuesFromMap(aktørIdList, storedAktørMap);
};

function getFilteredValuesFromMap<T>(array: number[], map: Map<number, T>) {
  return (
    array && map && (array.map((key) => map.get(key)).filter(Boolean) as T[])
  );
}

async function getAktørListFromService(aktørIdList: number[]) {
  const aktørListPromiseList = aktørIdList.map((aktørId) =>
    fetchAktør(aktørId)
  );

  return Promise.all(aktørListPromiseList);
}
