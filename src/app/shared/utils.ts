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
