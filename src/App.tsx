import {CssBaseline} from '@mui/material';
import {Routes, Route} from 'react-router';
import {Login} from './pages/Login.tsx';
import {Register} from './pages/Register.tsx';
import {Home} from './pages/Home.tsx';
import {CreatePost} from './pages/CreatePost.tsx';
import Header from './components/Header.tsx';
import { PostsList } from './pages/PostsList';
import { PostDetails } from './pages/PostDetails';
import { CategoriesList } from './pages/CategoriesList';
import { CreateCategory } from './pages/CreateCategory';
import { EditCategory } from './pages/EditCategory';
import { EditPost } from './pages/EditPost.tsx';
function App() {

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/create-post'} element={<CreatePost/>}/>
        <Route path="/posts" element={<PostsList />} />
  <Route path="/posts/:id" element={<PostDetails />} />
  <Route path="/create-post" element={<CreatePost />} />
  <Route path="/categories" element={<CategoriesList />} />
  <Route path="/create-category" element={<CreateCategory />} />
  <Route path="/edit-category/:id" element={<EditCategory />} />
  <Route path="/edit-post/:id" element={<EditPost />} />

      </Routes>
    </>
  );
}

export default App;
     
       
