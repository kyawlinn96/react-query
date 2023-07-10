import dayjs from 'dayjs';

export const commonDateFormat = (date: string) =>
  dayjs(date).format('DD MMM YYYY') + ' at ' + dayjs(date).format('h:mm A');
