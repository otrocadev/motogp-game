import { Component, inject, OnInit, computed } from '@angular/core';
import { MotogpStandingsService } from './motogp-standings.service';

@Component({
  selector: 'app-motogp-standings',
  imports: [],
  templateUrl: './motogp-standings.component.html',
})
export class MotogpStandingsComponent implements OnInit {
  private motogpStandingsService = inject(MotogpStandingsService);

  standings = this.motogpStandingsService.standings;

  async ngOnInit() {
    await this.motogpStandingsService.getStandings();
  }

  maxPoints = computed(() =>
    Math.max(...this.standings().map((standing) => standing.points))
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
