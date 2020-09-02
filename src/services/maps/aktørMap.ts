import { parseValueFromBiography } from '../../utility/aktør';

const FOLKETING_LINK_KEY = 'url';
const EMAIL_KEY = 'email';
const PARTY_KEY = 'party';
const ALT_PHONE_NUMBER_KEY = 'ministerPhone';
const PHONE_NUMBER_KEY = 'phoneFolketinget';
const PHOTO_URL_KEY = 'pictureMiRes';
const VALGKREDS_KEY = 'currentConstituency';
const ALT_VALGKREDS_KEY = 'substitute';

export const mapAktør = ({
  id,
  biografi,
  efternavn,
  fornavn,
  navn,
  typeid,
}: Aktør): Aktør => {
  return {
    biografi,
    efternavn,
    email: parseValueFromBiography(biografi, EMAIL_KEY),
    fornavn,
    folketingLink: parseValueFromBiography(biografi, FOLKETING_LINK_KEY),
    id,
    navn,
    parti: parseValueFromBiography(biografi, PARTY_KEY),
    phoneNumber:
      parseValueFromBiography(biografi, PHONE_NUMBER_KEY) ||
      parseValueFromBiography(biografi, ALT_PHONE_NUMBER_KEY),
    photoUrl: parseValueFromBiography(biografi, PHOTO_URL_KEY),
    valgkreds:
      parseValueFromBiography(biografi, VALGKREDS_KEY) ||
      parseValueFromBiography(biografi, ALT_VALGKREDS_KEY),
    typeid,
  };
};
