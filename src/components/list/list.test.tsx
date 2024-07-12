import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { usePosts } from '../../hooks/use.posts';
import List from './list';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { appStore } from '../../store/store';

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    loadPosts: jest.fn(),
    posts: [
      { userId: 1, id: 1, title: 'title1', body: 'body1' },
      { userId: 2, id: 2, title: 'title2', body: 'body2' },
    ],
  }),
}));

describe('List', () => {
  test('calls loadPosts on mount and renders cards for each skin', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <List></List>
        </Provider>
      </Router>,
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: '1' } });

    const list = screen.getByRole('list');
    const footer = screen.getByRole('contentinfo');
    const posts = screen.getAllByRole('listitem');
    expect(usePosts().loadPosts).toHaveBeenCalled();
    expect(list).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(posts).toHaveLength(5);
    expect(posts[0]).toHaveTextContent('title1');
    expect(posts[0]).toHaveTextContent('body1');
  });
});
