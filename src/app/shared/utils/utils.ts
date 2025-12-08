export function onImageError(event: Event): void {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = '/images/default_media_img.webp';
}

export function getMonthName(month: number) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[month];
}

export function formatDates(start: Date, end: Date) {
  const displayStartDate =
    start.getDate() + ' ' + getMonthName(start.getMonth());
  const displayEndDate = end.getDate() + ' ' + getMonthName(end.getMonth());

  return displayStartDate + ' - ' + displayEndDate;
}
