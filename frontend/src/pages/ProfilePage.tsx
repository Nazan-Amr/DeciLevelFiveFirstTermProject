import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatters';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-12">Please login to view your profile</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
            }`}>
              {user.role}
            </span>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium">{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account ID</span>
            <span className="font-medium font-mono text-sm">{user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;