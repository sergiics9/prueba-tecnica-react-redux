import { Post } from '../entities/post';
import postsReducer, { postsState } from './posts.slice';
import { deletePostThunk } from './posts.thunk';

describe('Given postsReducer', () => {
  describe(' When posts/setLoggedUser action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const mockPost = 'NameTest';
      const action = {
        type: 'posts/setLoggedUser',
        payload: mockPost,
      };
      const state: postsState = {} as postsState;
      const result = postsReducer(state, action);
      expect(result.loggedUser).toBe(mockPost);
    });
    test('Then the new state will be returned ', () => {
      const mockPost = 'testName';
      const action = {
        type: 'posts/loginSuccess',
        payload: mockPost,
      };
      const state: postsState = {} as postsState;
      const result = postsReducer(state, action);
      expect(result.loggedUser).toBe(mockPost);
    });
  });

  describe(' When posts/load/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const action = { type: 'load/pending' };
      const state: postsState = {} as postsState;
      const result = postsReducer(state, action);
      expect(result.postsState).toBe('loading');
    });
  });

  test('Then the new state will be returned ', () => {
    const action = { type: 'load/rejected' };
    const state: postsState = {} as postsState;
    const result = postsReducer(state, action);
    expect(result.postsState).toBe('error');
  });

  test('Then the new state will be returned ', () => {
    const action = {
      type: 'load/fulfilled',
      payload: [{}] as unknown as Post,
    };
    const state: postsState = {} as postsState;
    const result = postsReducer(state, action);
    expect(result.postsState).toBe('idle');
  });

  describe('When deletePostThunk.fulfilled action is dispatched', () => {
    test('Then the Post should be removed from the state', () => {
      const mockPost = { id: '1', name: 'NameTest' } as unknown as Post;
      const action = {
        type: deletePostThunk.fulfilled.type,
        payload: mockPost.id,
      };
      const state: postsState = { posts: [mockPost] } as postsState;
      const result = postsReducer(state, action);
      expect(result.posts).not.toContain(mockPost);
    });
  });
});
