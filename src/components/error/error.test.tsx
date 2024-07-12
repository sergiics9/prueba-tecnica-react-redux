import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from './error';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { appStore } from '../../store/store';

jest.mock('../../hooks/use.posts', () => ({
  usePosts: jest.fn().mockReturnValue({
    loggedUser: 'testUser',
  }),
}));

describe('Given...', () => {
  render(
    <Router>
      <Provider store={appStore}>
        <Error></Error>
      </Provider>
    </Router>,
  );
  describe('When we instantiate', () => {
    test('Then it should be in the document', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});