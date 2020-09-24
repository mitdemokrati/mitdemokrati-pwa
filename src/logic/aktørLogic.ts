import { fetchAktør } from '../services/aktørService';

export const loadAktørList = async (
  aktørIdList: number[]
): Promise<Aktør[]> => {
  if (aktørIdList.length < 1) {
    return [];
  }

  return getAktørListFromService(aktørIdList);
};

async function getAktørListFromService(aktørIdList: number[]) {
  const aktørListPromiseList = aktørIdList.map((aktørId) =>
    fetchAktør(aktørId)
  );

  return Promise.all(aktørListPromiseList);
}
