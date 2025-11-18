import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { OMDBService } from './omdb.service';

describe('OMDBService', () => {
  let service: OMDBService;

  beforeEach(() => {
    service = new OMDBService(inject(HttpClient));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an API response', () => {
    const response = service.searchMovies();
    expect(response).toBeTruthy();
  });
});
