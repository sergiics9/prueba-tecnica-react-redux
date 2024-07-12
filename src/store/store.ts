import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../redux/posts.slice';

// Configura el store de Redux
export const appStore = configureStore({
  reducer: {
    postsState: postsReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
