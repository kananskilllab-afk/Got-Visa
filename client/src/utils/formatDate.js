const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatFullDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const getYearRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 2015; y--) {
    years.push(y);
  }
  return years;
};

export const getMonthName = (monthNum) => {
  return MONTHS[monthNum - 1] || '';
};
