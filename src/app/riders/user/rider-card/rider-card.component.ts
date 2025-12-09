import { Component, AfterViewInit, input, signal, OnInit } from '@angular/core';
import { baseImgUrl } from '../../../config/endpoints';
import { RiderInfo } from '../../../shared/types/rider.types';
import Atropos from 'atropos';
import 'atropos/css';

@Component({
  selector: 'app-rider-card',
  imports: [],
  templateUrl: './rider-card.component.html',
})
export class RiderCardComponent implements AfterViewInit, OnInit {
  baseImgUrl = baseImgUrl;
  rider = input<RiderInfo>();

  imgPath = signal('');

  async ngOnInit() {
    let subUrl = '';
    if (this.rider()?.factory === 'DUCATI') {
      subUrl = 'logos/ducati_logo.svg';
    } else if (this.rider()?.factory === 'YAMAHA') {
      subUrl = 'logos/yamaha_logo.svg';
    } else if (this.rider()?.factory === 'HONDA') {
      subUrl = 'logos/honda_logo.svg';
    } else if (this.rider()?.factory === 'APRILIA') {
      subUrl = 'logos/aprilia_logo.svg';
    } else if (this.rider()?.factory === 'KTM') {
      subUrl = 'logos/ktm_logo.svg';
    }
    this.imgPath.set(baseImgUrl + subUrl);
    console.log(this.imgPath());
  }

  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.rider-card');

    cards.forEach((card) => {
      Atropos({
        el: card as HTMLElement,
        activeOffset: 20,
        shadow: false,
        rotateXMax: 15,
        rotateYMax: 15,
      });
    });
  }
}
