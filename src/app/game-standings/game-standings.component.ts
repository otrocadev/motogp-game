import { Component, inject, OnInit, computed } from '@angular/core';
import { GameStandingsService } from './game-standings.service';

@Component({
  selector: 'app-game-standings',
  imports: [],
  templateUrl: './game-standings.component.html',
  styles: ``,
})
export class GameStandingsComponent implements OnInit {
  private gameStandingsService = inject(GameStandingsService);

  standings = this.gameStandingsService.standings;

  async ngOnInit() {
    await this.gameStandingsService.getStandings();
  }

  maxPoints = computed(() =>
    Math.max(...this.standings().map((standing) => standing.credits))
  );

  pageSize = 12;
  currentPage = 0;
  totalPages = computed(() =>
    Math.ceil(this.standings().length / this.pageSize)
  );
  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i)
  );

  pagedStandings() {
    const all = this.standings();
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return all.slice(start, end);
  }

  nextPage() {
    console.log('next page');
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
