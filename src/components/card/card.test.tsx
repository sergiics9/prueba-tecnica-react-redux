import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Card } from './card';
import '@testing-library/jest-dom';
import { Post } from '../../entities/post';
import { appStore } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { usePosts } from '../../hooks/use.posts';
import Swal, { SweetAlertResult } from 'sweetalert2';

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    deletePost: jest.fn(),
    loadPosts: jest.fn(),
    loggedUser: { userName: 'Sergi' },
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({
    isConfirmed: true,
  } as SweetAlertResult),
}));

// Now you can use Swal.fire as a mock function in your tests
(Swal.fire as jest.Mock).mockResolvedValue({
  isConfirmed: true,
} as SweetAlertResult);

//

describe('Given Card component', () => {
  const post = {
    userId: 1,
    id: 1,
    title: 'test',
    body: 'test2',
  } as unknown as Post;

  describe('When we instantiate', () => {
    test('Then it should render correctly', () => {
      const {} = render(
        <Provider store={appStore}>
          <Router>
            <Card post={post} />
          </Router>
        </Provider>,
      );
    });

    test('Then it should call handleDelete when delete button is clicked', async () => {
      render(
        <Provider store={appStore}>
          <Router>
            <Card post={post} />
          </Router>
        </Provider>,
      );

      const deleteButton = screen.getAllByRole('button');
      await userEvent.click(deleteButton[0]);

      expect(usePosts().deletePost).toHaveBeenCalled();
    });
  });
});
