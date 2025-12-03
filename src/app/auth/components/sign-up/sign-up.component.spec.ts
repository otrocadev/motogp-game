import { ComponentFixture, TestBed } from '@angular/core/testing';
import SignUpComponent from './sign-up.component';
import { AuthService } from '../../data-access/auth.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['signUp']);

    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [{ provide: AuthService, useValue: authSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success message on successful sign up', async () => {
    const mockResponse = { data: { user: {} }, error: null };
    authServiceSpy.signUp.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      username: 'johndoe',
      email: 'test@example.com',
      password: 'password123',
    });

    await component.onSubmit();

    expect(component.successMessage()).toBe('Account created successfully!');
    expect(component.errorMessage()).toBeNull();
  });

  it('should show error message when user already registered', async () => {
    const mockResponse = {
      data: { user: null },
      error: { message: 'User already registered' },
    };
    authServiceSpy.signUp.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      username: 'johndoe',
      email: 'test@example.com',
      password: 'password123',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe('This email is already registered');
  });

  it('should show error message on invalid email', async () => {
    const mockResponse = {
      data: { user: null },
      error: { message: 'Invalid email' },
    };
    authServiceSpy.signUp.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      username: 'johndoe',
      email: 'test@example.com', // ← Valid mail to pass the first form validation
      password: 'password123',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe('Invalid email format');
  });
  it('should show error message on too many requests', async () => {
    const mockResponse = {
      data: { user: null },
      error: { message: 'Too many requests' },
    };
    authServiceSpy.signUp.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      username: 'johndoe',
      email: 'test@example.com',
      password: 'password123',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe(
      'Too many requests. Please try again later.'
    );
  });

  it('should show error message on unexpected error', async () => {
    const mockResponse = {
      data: { user: null },
      error: { message: 'Unexpected error' },
    };
    authServiceSpy.signUp.and.returnValue(Promise.resolve(mockResponse as any));

    component.form.setValue({
      name: 'John',
      surname: 'Doe',
      username: 'johndoe',
      email: 'test@example.com',
      password: 'password123',
    });

    await component.onSubmit();

    expect(component.errorMessage()).toBe(
      'Unexpected error. Please try again later.'
    );
  });
});
