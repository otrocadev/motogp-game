import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import LogInComponent from './log-in.component';
import { AuthService } from '../../data-access/auth.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logIn']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LogInComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page on successful login', async () => {
    const mockResponse = { data: { user: {} }, error: null };
    authServiceSpy.logIn.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      email: 'test@example.com',
      password: 'password',
    });

    await component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show error message on failed login', async () => {
    const mockResponse = {
      data: { user: null },
      error: { message: 'Invalid login credentials' },
    };
    authServiceSpy.logIn.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      email: 'test@example.com',
      password: 'password',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe('Invalid email or password');
  });

  it('should show error message on too many requests', async () => {
    const mockResponse = {
      data: { user: {} },
      error: { message: 'Too many requests' },
    };
    authServiceSpy.logIn.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      email: 'test@example.com',
      password: 'password',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe(
      'Too many requests. Please try again later.'
    );
  });

  it('should show error message on unexpected error', async () => {
    const mockResponse = {
      data: { user: {} },
      error: { message: 'Unexpected error' },
    };
    authServiceSpy.logIn.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      email: 'test@example.com',
      password: 'password',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe(
      'Unexpected error. Please try again later.'
    );
  });
});
