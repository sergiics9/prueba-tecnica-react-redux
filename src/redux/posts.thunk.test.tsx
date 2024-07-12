import configureMockStore from 'redux-mock-store';
import { loadPostsThunk, deletePostThunk } from './posts.thunk';
import { ApiRepo } from '../services/api.repo';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const middlewaress = [thunk];
const mockStore = configureMockStore(middlewaress);

describe('posts thunks', () => {
  let store: ReturnType<typeof mockStore> & {
    dispatch: ThunkDispatch<object, object, AnyAction>;
  };
  let mockRepo: ApiRepo;

  beforeEach(() => {
    store = mockStore({});
    mockRepo = {
      getPosts: jest.fn().mockResolvedValue([]),
      deletePost: jest.fn().mockResolvedValue([]),
    } as unknown as ApiRepo;
  });

  test('loadSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(loadPostsThunk(mockRepo));
    const actions = store.getActions();
    expect(actions[0].type).toBe('load/pending');
    expect(actions[1].type).toBe('load/fulfilled');
  });

  test('deleteSkinThunk dispatches the correct actions', async () => {
    await store.dispatch(deletePostThunk(1));
    const actions = store.getActions();
    expect(actions[0].type).toBe('delete/pending');
    expect(actions[1].type).toBe('delete/fulfilled');
  });
});
