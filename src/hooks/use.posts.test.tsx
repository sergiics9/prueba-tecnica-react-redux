import { render, screen } from '@testing-library/react';
import { usePosts } from './use.posts';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/post';
import { RootState } from '../store/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest
    .fn()
    .mockReturnValue((state: RootState) => state.postsState)
    .mockReturnValue({}),
}));

const mockNewID = {} as Post['id'];

describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const { loadPosts, deletePost, logout } = usePosts();

    return (
      <>
        <button onClick={() => loadPosts()}></button>
        <button onClick={() => deletePost(mockNewID)}> </button>
        <button onClick={() => logout()}></button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(<TestComponent></TestComponent>);
    elements = screen.getAllByRole('button');
  });

  describe('When we click button loadPosts', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[0]);

      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe('When we click button loadPosts and loggedUser is not empty', () => {
    test('Then the dispatch should have been called', async () => {
      (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
        selector({
          postsState: { posts: [] },
        }),
      );

      await userEvent.click(elements[0]);

      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe('When we click button deletePost', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button logout', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
