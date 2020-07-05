import { mapStemme } from './stemmeMap';
import { mapSagstrin } from './sagstrinMap';
import { mapMøde } from './mødeMap';

export const mapOldAfstemning = ({
  Møde,
  Sagstrin,
  Stemme,
  forslagStillerId,
  id,
  konklusion,
  previousAfstemningId,
  vedtaget,
}: FTAfstemning): FTAfstemning => {
  return {
    Møde: mapMøde(Møde),
    Sagstrin: mapSagstrin(Sagstrin),
    Stemme: Stemme.map(mapStemme),
    forslagStillerId,
    id,
    konklusion,
    previousAfstemningId,
    vedtaget,
  };
};

export const mapAfstemning = (ftAfstemning: FTAfstemning): Afstemning => ({
  dato: ftAfstemning.Møde.dato,
  forslagStillerId: ftAfstemning.forslagStillerId,
  id: ftAfstemning.id,
  konklusion: ftAfstemning.konklusion,
  resume: ftAfstemning.Sagstrin.Sag.resume,
  stemmeList: ftAfstemning.Stemme,
  titel: ftAfstemning.Sagstrin.Sag.titelkort,
  vedtaget: ftAfstemning.vedtaget,
});
