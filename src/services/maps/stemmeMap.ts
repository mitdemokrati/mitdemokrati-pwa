export const mapStemme = ({
  afstemningid,
  aktørid,
  typeid,
}: Stemme): Stemme => {
  return { aktørid, afstemningid, typeid };
};
