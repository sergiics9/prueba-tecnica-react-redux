import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { appStore } from '../../store/store';
import { App } from './app';
import '@testing-library/jest-dom';

describe('Given Footer component', () => {
  describe('When we Render it', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <App></App>
        </Provider>
      </Router>
    );

    test('Then it should be...', () => {
      const element = screen.getByRole('main');
      expect(element).toBeInTheDocument();
    });
  });
});
