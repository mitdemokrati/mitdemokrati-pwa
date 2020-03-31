export function parseAfstemningId(data: LatestIdResponse): AfstemningId {
  const date = new Date(Date.parse(data?.value[0]?.Møde?.dato));
  const sagsId = data?.value[0]?.Sagstrin?.Sag?.id;
  const id = data?.value[0]?.id;

  return { id, date, sagsId };
}
