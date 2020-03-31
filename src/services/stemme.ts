import axios from 'axios';
import { mapStemme } from './maps/stemmeMap';

const STEMME_URL =
  'https://oda.ft.dk/api/Stemme?$filter=afstemningid eq idPlaceholder&$select=id,typeid,aktørid';

export const fetchStemmeList = async (
  afstemningId: number
): Promise<Stemme[]> => {
  const { data } = await axios.request<StemmeResponse>({
    url: STEMME_URL.replace('idPlaceholder', afstemningId.toString())
  });

  if (data['odata.nextLink']) {
    const { data: nextData } = await axios.request<StemmeResponse>({
      url: data['odata.nextLink']
    });

    return [...data?.value, ...nextData?.value].map(mapStemme);
  }

  return data?.value.map(mapStemme);
};
