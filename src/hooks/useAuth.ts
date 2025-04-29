import { useEffect, useState } from 'react';
import axiosApi from '../axiosApi';
import { IUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosApi.get('/users/me/'); 
        setUser({
          id: response.data.id,
          username: response.data.username,
          accessToken,
          refreshToken: localStorage.getItem('refreshToken'),
        });
      } catch (error) {
        console.error('Failed to verify user:', error);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};