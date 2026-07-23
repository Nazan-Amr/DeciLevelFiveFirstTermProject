import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle Google OAuth callback
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/';
      return;
    }

    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, searchParams]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <LoginForm />
    </div>
  );
};

export default LoginPage;