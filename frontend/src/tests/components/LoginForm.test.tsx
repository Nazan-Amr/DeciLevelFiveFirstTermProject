import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

vi.mock('../../stores/authStore', () => ({
  useAuthStore: () => ({
    login: vi.fn()
  })
}));

vi.mock('../../api/auth.api', () => ({
  login: vi.fn().mockResolvedValue({
    data: {
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test', role: 'CUSTOMER' },
        token: 'token'
      }
    }
  }),
  register: vi.fn()
}));

describe('LoginForm', () => {
  it('renders login form by default', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('allows entering email and password', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});