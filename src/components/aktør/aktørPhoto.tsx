import React from 'react';

const DEFAULT_PHOTO_SIZE = 310;

type AktørPhotoProps = {
  height?: number;
  name?: string;
  photoUrl?: string;
  width?: number;
};
export const AktørPhoto = ({
  height = DEFAULT_PHOTO_SIZE,
  name,
  photoUrl,
  width = DEFAULT_PHOTO_SIZE,
}: AktørPhotoProps): JSX.Element | null => {
  if (!photoUrl) {
    return null;
  }

  const correctedUrl = correctPhotoUrl(photoUrl);

  return (
    <img
      alt={`billede af ${name}`}
      loading="lazy"
      height={height}
      src={correctedUrl}
      width={width}
    />
  );
};

function correctPhotoUrl(url: string) {
  return url
    .replace('master-eu.ft.dk:443', 'www.ft.dk')
    .replace('master-ft.ft.dk:443', 'www.ft.dk');
}
