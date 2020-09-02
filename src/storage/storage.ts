import { getFromStorage, setInStorage } from './storageAdapter';
import {
  getDecompressionWorker,
  getCompressionWorker,
} from '../webworkers/workers';

const AFSTEMNING_LIST_KEY = 'afstemning_list';
const AKTØR_LIST_KEY = 'aktør_list';

export async function loadAfstemningListFromStorage() {
  return asyncUnzipStoredData<Afstemning[]>(AFSTEMNING_LIST_KEY);
}
export function loadAktørListFromStorage() {
  return asyncUnzipStoredData<Aktør[]>(AKTØR_LIST_KEY);
}

export function saveAfstemningListToStorage(afstemningList: Afstemning[]) {
  asyncStoreZippedData(AFSTEMNING_LIST_KEY, afstemningList);
}

export function saveAktørListToStorage(aktørList: Aktør[]) {
  asyncStoreZippedData(AKTØR_LIST_KEY, aktørList);
}

function asyncUnzipStoredData<T>(key: string): Promise<T> {
  const unzipWorker = getDecompressionWorker();
  const zippedData = getFromStorage(key);

  const loadDataPromise = new Promise<T>((resolve) => {
    unzipWorker.onmessage = (event) => {
      resolve(event.data);
    };
  });

  unzipWorker.postMessage(zippedData);

  return loadDataPromise;
}

function asyncStoreZippedData(key: string, data: unknown) {
  const zipWorker = getCompressionWorker();

  zipWorker.onmessage = (event) => {
    setInStorage(key, event.data);
  };

  zipWorker.postMessage(data);
}
