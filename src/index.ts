import {
  fetchAfstemning,
  fetchLatestAfstemningId
} from './services/afstemning';

const updateDataElement = (date: Date, afstemning: Afstemning) => {
  const dataElement = document.querySelector('#data');

  if (!dataElement) {
    return;
  }

  dataElement.innerHTML = `<p>${afstemning.id}</p><p>${date.toUTCString()}</p>`;
};

const getLatestAfstemning = async (): Promise<{
  date: Date;
  afstemning: Afstemning;
}> => {
  const { id, date } = await fetchLatestAfstemningId();
  const afstemning = await fetchAfstemning(id);

  return { date, afstemning };
};

getLatestAfstemning().then(({ date, afstemning }) => {
  updateDataElement(date, afstemning);
});
