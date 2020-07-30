import memize from 'memize';

export const parseDateToLocale = memize((dateString: string) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(Date.parse(dateString));

  return date.toLocaleDateString('da-DK');
});
