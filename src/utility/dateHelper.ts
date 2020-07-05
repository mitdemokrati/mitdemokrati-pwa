export const parseDateToLocale = (dateString: string) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(Date.parse(dateString));

  return date.toLocaleString('da-DK');
};
