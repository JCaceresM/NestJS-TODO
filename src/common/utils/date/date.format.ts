const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function getDateAsSpanishLongDate(dateAsString){
  let utcDate = new Date(dateAsString)
  let today = new Date(new Date(utcDate).getTime() + utcDate.getTimezoneOffset() * 60000);
  let day = today.getDate();
  let month = monthNames[today.getMonth()];
  let year = today.getFullYear();

  return `${day} de ${month}, ${year}`;
}

export const dateMapped = (dateString) => {
  const dateArray = dateString.split("-");
  return `${dateArray[2]} de ${monthNames[parseInt(dateArray[1]) - 1]}, ${dateArray[0]}`;
};