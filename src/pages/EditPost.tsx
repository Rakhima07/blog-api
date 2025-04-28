import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../axiosApi';
import { IPost } from '../types';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosApi.get<IPost>(`/posts/${id}/`).then(res => setPost(res.data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) return;

    try {
      await axiosApi.patch(`/posts/${id}/`, {
        title: post.title,
        content: post.content,
        category: post.category,
        author: post.author,
        extra_info: post.extra_info,
      });
      navigate('/posts');
    } catch {
      setError('Ошибка при редактировании поста');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) return;
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={post.category}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Extra Info"
            name="extra_info"
            value={post.extra_info || ''}
            onChange={handleChange}
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
