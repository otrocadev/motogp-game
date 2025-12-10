import { Component, AfterViewInit, input, signal, OnInit } from '@angular/core';
import { baseImgUrl } from '../../../config/endpoints';
import { RiderInfo } from '../../../shared/types/rider.types';
import { getFactoryLogo } from '../../factory.utils';
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
    this.imgPath.set(getFactoryLogo(this.rider()?.factory!));
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
