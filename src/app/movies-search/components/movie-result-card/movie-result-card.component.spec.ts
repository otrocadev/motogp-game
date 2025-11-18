import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieResultCardComponent } from './movie-result-card.component';

describe('MovieResultCardComponent', () => {
  let component: MovieResultCardComponent;
  let fixture: ComponentFixture<MovieResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieResultCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
