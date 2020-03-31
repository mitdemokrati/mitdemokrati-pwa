import { mapStemme } from './stemmeMap';
import { mapSagstrin } from './sagstrinMap';
import { mapMøde } from './mødeMap';

export const mapAfstemning = ({
  Møde,
  Sagstrin,
  Stemme,
  id,
  vedtaget
}: Afstemning): Afstemning => {
  return {
    Møde: mapMøde(Møde),
    Sagstrin: mapSagstrin(Sagstrin),
    Stemme: Stemme.map(mapStemme),
    id,
    vedtaget
  };
};
