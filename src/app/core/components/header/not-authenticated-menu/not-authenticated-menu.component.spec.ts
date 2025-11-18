import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthenticatedMenuComponent } from './not-authenticated-menu.component';

describe('NotAuthenticatedMenuComponent', () => {
  let component: NotAuthenticatedMenuComponent;
  let fixture: ComponentFixture<NotAuthenticatedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAuthenticatedMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthenticatedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
