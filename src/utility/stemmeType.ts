export const getStemmeTypeString = (type: StemmeType) => {
  switch (type) {
    case 1:
      return 'For';

    case 2:
      return 'Imod';

    case 3:
      return 'Blank';

    case 4:
      return 'Fraværende';

    default:
      return '';
  }
};
