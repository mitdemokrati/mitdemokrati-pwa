import { parseParty } from '../../utility/party';

export const mapAktør = ({
  id,
  biografi,
  efternavn,
  fornavn,
  navn,
  typeid,
}: Aktør): Aktør => {
  return {
    id,
    efternavn,
    fornavn,
    navn,
    typeid,
    parti: parseParty(biografi),
  };
};
