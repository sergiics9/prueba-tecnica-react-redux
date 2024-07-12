import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../services/api.repo';
import { Post } from '../entities/post';

// Define el thunk para cargar los posts y devolver un array de posts para actualizar el estado de Redux
export const loadPostsThunk = createAsyncThunk<Post[], ApiRepo>(
  'load',
  async (repo) => {
    const posts = await repo.getPosts();
    return posts;
  },
);

// Define el thunk para eliminar un post por id y devolver el id del post eliminado para actualizar el estado de Redux con el id eliminado
export const deletePostThunk = createAsyncThunk<number, number>(
  'delete',
  async (id) => {
    await new ApiRepo().deletePost(id);
    return id;
  },
);
