import { fetchAktoer } from '../services/aktoerService';

export const loadAktoerList = async (
  aktoerIdList: number[]
): Promise<Aktoer[]> => {
  if (aktoerIdList.length < 1) {
    return [];
  }

  return getAktoerListFromService(aktoerIdList);
};

async function getAktoerListFromService(aktoerIdList: number[]) {
  const aktoerListPromiseList = aktoerIdList.map((aktoerId) =>
    fetchAktoer(aktoerId)
  );

  return Promise.all(aktoerListPromiseList);
}
