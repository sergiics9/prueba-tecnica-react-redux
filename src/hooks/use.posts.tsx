/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useCallback } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsThunk, deletePostThunk } from '../redux/posts.thunk';
import { AppDispatch, RootState } from '../store/store';
import { setLoggedUser } from '../redux/posts.slice';

export function usePosts() {
  // Define el dispatch y el selector para obtener el estado de los posts
  const dispatch = useDispatch<AppDispatch>();
  // Define el selector para obtener el estado de los posts
  const { posts } = useSelector((state: RootState) => state.postsState);
  // Define el selector para obtener el estado del usuario logueado
  const loggedUser = useSelector(
    (state: RootState) => state.postsState.loggedUser,
  );

  // Define el repositorio de la API
  const repo = useMemo(() => new ApiRepo(), []);

  // Define el método para cargar los posts desde la API y actualizar el estado de Redux con los posts cargados
  const loadPosts = useCallback(async () => {
    try {
      dispatch(loadPostsThunk(repo));
    } catch (error) {
      // console.log((error as Error).message);
    }
  }, [repo]);

  // Define el método para eliminar un post por id y actualizar el estado de Redux con el post eliminado por id
  const deletePost = useCallback(async (id: number) => {
    try {
      dispatch(deletePostThunk(id));
    } catch (error) {
      // console.log((error as Error).message);
    }
  }, []);

  // Simplemente establecemos el usuario loggeado como null para indicar que no hay ningún usuario loggeado
  const logout = () => {
    dispatch(setLoggedUser(null));
  };

  return { posts, loadPosts, deletePost, loggedUser, logout };
}
