export const getDateAsSpanishShortDate = (dateAsString: string = "notSet") => {
  try {
    const data =  (dateAsString === "notSet" ? new Date(): new Date(dateAsString)).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const [date, hour, Periods] = data.split(' ');
    return { date: date.replace(/[/]/g,"-"), hour: `${hour} ${Periods}` };
  } catch (error) {
    return error;
  }
};