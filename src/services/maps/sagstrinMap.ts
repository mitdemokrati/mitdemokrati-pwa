import { mapSag } from './sagMap';

export const mapSagstrin = ({ Sag, id }: Sagstrin): Sagstrin => {
  return { Sag: mapSag(Sag), id };
};
