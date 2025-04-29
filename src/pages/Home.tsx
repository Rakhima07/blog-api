import {useAuthStore} from '../store/useAuthStore.ts';
import { PostsList } from './PostsList.tsx';
export const Home = () => {
  const { accessToken } = useAuthStore();

  return (
    <div>
      {accessToken ? (
        <PostsList />
      ) : (
        <div>
          Пожалуйста, войдите чтобы увидеть посты.
        </div>
      )}
    </div>
  );
};


