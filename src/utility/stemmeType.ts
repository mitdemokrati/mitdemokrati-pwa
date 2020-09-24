export const getStemmeTypeString = (type: StemmeType): string => {
  switch (type) {
    case 1:
      return 'For';

    case 2:
      return 'Imod';

    case 3:
      return 'Fraværende';

    case 4:
      return 'Blank';

    default:
      return '';
  }
};
