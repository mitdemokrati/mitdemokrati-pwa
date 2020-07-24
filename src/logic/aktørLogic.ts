import { fetchAktør } from '../services/aktørService';
import {
  loadAktørListFromStorage,
  saveAktørListToStorage,
} from '../storage/storage';
import { mapArray } from '../utility/misc';

export const loadAktørList = async (aktørIdList: number[]) => {
  if (aktørIdList.length < 1) {
    return [];
  }

  const uniqueAktørIdList = Array.from(new Set(aktørIdList));

  const storedAktørMap = mapArray(loadAktørListFromStorage(), 'id');

  const missingAktørIdList = uniqueAktørIdList.filter(
    (aktørId) => !storedAktørMap.has(aktørId)
  );

  if (missingAktørIdList.length < 1) {
    return aktørIdList
      .map((aktørId) => storedAktørMap.get(aktørId))
      .filter(Boolean) as Aktør[];
  }

  // Get missing ids from service
  const aktørListPromiseList = missingAktørIdList.map((aktørId) =>
    fetchAktør(aktørId)
  );

  const aktørListFromService = await Promise.all(aktørListPromiseList);

  aktørListFromService.forEach((aktør) => storedAktørMap.set(aktør.id, aktør));

  // Update stored aktørList with new aktør
  saveAktørListToStorage([...storedAktørMap.values()]);

  return aktørIdList
    .map((aktørId) => storedAktørMap.get(aktørId))
    .filter(Boolean) as Aktør[];
};
