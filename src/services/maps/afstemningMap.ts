export const mapAfstemning = (ftAfstemning: FTAfstemning): Afstemning => ({
  dato: ftAfstemning.Møde.dato,
  forslagStillerId: ftAfstemning.forslagStillerId,
  id: ftAfstemning.id,
  konklusion: ftAfstemning.konklusion,
  resume: ftAfstemning.Sagstrin.Sag.resume,
  sagId: ftAfstemning.Sagstrin.Sag.id,
  stemmeList: ftAfstemning.Stemme,
  titel: ftAfstemning.Sagstrin.Sag.titelkort,
  vedtaget: ftAfstemning.vedtaget,
});
