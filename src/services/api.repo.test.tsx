import { Post } from '../entities/post';
import { ApiRepo } from './api.repo';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Given ApiRepo class', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  describe('When we call getPosts', () => {
    test('Then axios should be called and return an array', async () => {
      const expected: Post[] = [];
      mock.onGet().reply(200, expected);
      const repo = new ApiRepo();
      const result = await repo.getPosts();
      expect(result).toStrictEqual(expected);
    });
  });

  describe('When we call getPosts and response is bad', () => {
    test('Then getPosts should throw an error', async () => {
      mock.onGet().reply(500);
      const repo = new ApiRepo();
      await expect(repo.getPosts()).rejects.toThrow();
    });
  });

    describe('When we call deletePost', () => {
    test('Then axios should be called and return an array', async () => {
      const postId = 1;
      const expected: Post[] = [];
      mock.onDelete().reply(201, expected);
      const repo = new ApiRepo();
      const result = await repo.deletePost(postId);
      expect(result).toStrictEqual(expected);
    });
  });

  describe('When we call deletePost and response is bad', () => {
    test('Then deletePost should throw an error', async () => {
      const postId = 1;
      mock.onDelete().reply(500);
      const repo = new ApiRepo();
      await expect(repo.deletePost(postId)).rejects.toThrow();
    });
  });
});
