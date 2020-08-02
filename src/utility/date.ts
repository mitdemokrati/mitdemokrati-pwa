import memize from 'memize';

const danishFormatter = new Intl.DateTimeFormat('da');

export const parseDateToLocale = memize((dateString: string) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(Date.parse(dateString));

  return danishFormatter.format(date);
});
