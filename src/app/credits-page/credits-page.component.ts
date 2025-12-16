import { Component, OnInit, inject, signal } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CreditsService } from './credits.service';

@Component({
  selector: 'app-credits-page',
  imports: [],
  templateUrl: './credits-page.component.html',
  styles: ``,
})
export class CreditsPageComponent implements OnInit {
  private _creditsService = inject(CreditsService);

  creditsData = signal<any[]>([]);
  creditsEarnedArray = signal<number[]>([]);
  lastGrandPrixNames = signal<string[]>([]);

  chart!: Chart;

  async ngOnInit() {
    const data = await this._creditsService.getLastUserCreditsEarned();
    this.creditsData.set(data);

    const creditsArray = data.map((c: any) => c.credits_earned);
    const namesArray = data.map(
      (c: any) => c['2026_grand_prixes'].name || 'Unknown'
    );

    this.creditsEarnedArray.set(creditsArray);
    this.lastGrandPrixNames.set(namesArray);

    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: namesArray,
        datasets: [
          {
            label: 'Credits earned on the last sessions',
            data: creditsArray,
            backgroundColor: '#4cd625',
            borderColor: '#efefef',
            borderWidth: 4,
            borderRadius: 8,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#efefef',
              font: {
                family: '"Raleway"',
                size: 14,
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              color: '#efefef',
              font: {
                family: '"Raleway"',
                size: 12,
              },
              stepSize: 1,
              callback: function (value: any) {
                return Number.isInteger(value) ? value : '';
              },
            },
            grid: {
              display: false,
            },
            border: {
              color: '#efefef',
              width: 2,
            },
          },
          x: {
            ticks: {
              color: '#efefef',
              font: {
                family: '"Raleway"',
                size: 12,
              },
            },
            grid: {
              display: false,
            },
            border: {
              color: '#efefef',
              width: 2,
            },
          },
        },
      },
    });
  }
}
