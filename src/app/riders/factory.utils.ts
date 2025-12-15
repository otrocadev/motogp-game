import { baseImgUrl } from '../config/endpoints';

export function getFactoryLogo(factory: string) {
  let subUrl = '';
  if (factory === 'DUCATI') {
    subUrl = 'logos/ducati_logo.svg';
  } else if (factory === 'YAMAHA') {
    subUrl = 'logos/yamaha_logo.svg';
  } else if (factory === 'HONDA') {
    subUrl = 'logos/honda_logo.svg';
  } else if (factory === 'APRILIA') {
    subUrl = 'logos/aprilia_logo.svg';
  } else if (factory === 'KTM') {
    subUrl = 'logos/ktm_logo.svg';
  }
  return baseImgUrl + subUrl;
}
