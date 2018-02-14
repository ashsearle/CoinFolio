export const formatDate = (date, includeDay) => {
  if (!date) {
    console.error('formatDate needs a date!')
  }
  date = typeof date === 'string' ? date : date.json();
  includeDay = !!includeDay;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const jsDate = new Date(date);
  return (
    (includeDay ? days[jsDate.getDay()] : '') +
    ' ' +
    jsDate.getDate() +
    ' ' +
    months[jsDate.getMonth()] +
    ' ' +
    jsDate.getFullYear()
  );
};