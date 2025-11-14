import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthenticatedMenuComponent } from './user-authenticated-menu.component';

describe('UserAuthenticatedMenuComponent', () => {
  let component: UserAuthenticatedMenuComponent;
  let fixture: ComponentFixture<UserAuthenticatedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthenticatedMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthenticatedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
