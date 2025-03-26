const convertDate = (
  date,
  options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false,
  },
  lang = 'es-ES'
) => {
  const OriginalDate = new Date(date);
  return OriginalDate.toLocaleString(
    lang,
    options,
  );
};

export default convertDate;
