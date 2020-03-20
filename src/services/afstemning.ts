import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

const latestAfstemningUrl =
  'https://oda.ft.dk/api/Afstemning?$expand=M%C3%B8de&$orderby=M%C3%B8de/dato%20desc,id%20desc&$top=1&$select=id,M%C3%B8de/dato&$filter=typeid eq 1';

const afstemningUrl =
  'https://oda.ft.dk/api/Afstemning(idPlaceholder)?$expand=Sagstrin/Sag,M%C3%B8de';

const afstemningStillerUrl =
  'https://oda.ft.dk/api/SagAkt%C3%B8r?$filter=sagid eq sagsIdPlaceholder and (rolleid eq 19 or rolleid eq 16)&$select=akt%C3%B8rid';

export const fetchAfstemning = async (
  afstemningId: number
): Promise<Afstemning> => {
  const { data } = await axios.request<AfstemningResponse>({
    method: 'get',
    url: afstemningUrl.replace('idPlaceholder', afstemningId.toString())
  });

  console.log(data);

  const { id } = data;

  return data;
};

export const fetchLatestAfstemningId = async (): Promise<{
  id: number;
  date: Date;
}> => {
  const { data } = await axios.request<LatestIdResponse>({
    method: 'get',
    url: latestAfstemningUrl
  });

  const date = new Date(Date.parse(data?.value[0]?.Møde?.dato));
  const id = data?.value[0]?.id;

  return { id, date };
};
