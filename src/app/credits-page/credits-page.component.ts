import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LastGpsCreditsComponent } from './last-gps-credits/last-gps-credits.component';

@Component({
  selector: 'app-credits-page',
  imports: [LastGpsCreditsComponent],
  templateUrl: './credits-page.component.html',
  styles: ``,
})
export class CreditsPageComponent implements OnInit {
  chart!: Chart;

  ngOnInit(): void {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#4cd625',
            tension: 0,
          },
        ],
      },
    });
  }
}
