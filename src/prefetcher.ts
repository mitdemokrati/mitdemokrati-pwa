/* eslint-disable */

import fs from 'fs';
import http from 'http';
import https from 'https';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { compress } from 'lz-string';

import {
  fetchLatestAfstemningId,
  fetchAfstemning,
} from './services/afstemning';

const START_TIME = process.hrtime();

const afstemningList: FTAfstemning[] = [];

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.create({
  // keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

getCompleteAfstemningList().then(() => {
  console.info('done');
});

function writeAfstemningFiles() {
  const jsonString = JSON.stringify(afstemningList);
  const zipString = compress(jsonString);

  fs.writeFile(
    './data/afstemning_list.json',
    jsonString,
    (err: Error | null) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFile(
    './data/afstemning_list.json.lz',
    zipString,
    (err: Error | null) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

async function getCompleteAfstemningList() {
  let nextAfstemningId:
    | AfstemningId
    | undefined = await fetchLatestAfstemningId();

  while (nextAfstemningId && nextAfstemningId.id) {
    console.info(`${nextAfstemningId.id} %ds`, process.hrtime(START_TIME)[0]);

    const currentAfstemningPromise = fetchAfstemning(nextAfstemningId.id);

    writeAfstemningFiles();

    const currentAfstemning = await currentAfstemningPromise;

    if (!currentAfstemning) {
      return;
    }

    afstemningList.push(currentAfstemning);

    nextAfstemningId = currentAfstemning.previousAfstemningId;
  }
}
