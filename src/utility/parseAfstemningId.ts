export function parseAfstemningId(data: LatestIdResponse): AfstemningId {
  const dato = data?.value[0]?.Møde?.dato;
  const sagsId = data?.value[0]?.Sagstrin?.Sag?.id;
  const id = data?.value[0]?.id;

  return { id, dato, sagsId };
}
