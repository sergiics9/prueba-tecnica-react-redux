import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../entities/post';
import { loadPostsThunk, deletePostThunk } from './posts.thunk';

// Define el tipado del estado

export type postsState = {
  posts: Post[];
  postsState: 'idle' | 'loading' | 'error';
  loggedUser: string | null;
};

// Define el estado inicial
const initialState: postsState = {
  posts: [],
  postsState: 'idle',
  loggedUser: null,
};

// Define el slice de Redux para los posts con las acciones y reducers correspondientes para actualizar el estado de Redux
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Define el reducer para actualizar el usuario logueado
    setLoggedUser: (
      state: postsState,
      { payload }: PayloadAction<string | null>,
    ) => {
      state.loggedUser = payload;
    },
    // Define el reducer para actualizar el usuario logueado con éxito
    loginSuccess: (state: postsState, { payload }: PayloadAction<string>) => {
      state.loggedUser = payload;
    },
  },
  // Define los reducers adicionales para actualizar el estado de los posts
  extraReducers: (builder) => {
    builder.addCase(loadPostsThunk.pending, (state: postsState) => {
      state.postsState = 'loading';
      return state;
    });
    builder.addCase(
      loadPostsThunk.fulfilled,
      (state: postsState, { payload }: PayloadAction<Post[]>) => {
        state.posts = payload;
        state.postsState = 'idle';
        return state;
      },
    );
    builder.addCase(loadPostsThunk.rejected, (state: postsState) => {
      state.postsState = 'error';
      return state;
    });
    // Define el reducer para eliminar un post
    builder.addCase(
      deletePostThunk.fulfilled,
      (state: postsState, { payload }: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== payload);
        return state;
      },
    );
  },
});

export default postsSlice.reducer;

export const { setLoggedUser, loginSuccess } = postsSlice.actions;
