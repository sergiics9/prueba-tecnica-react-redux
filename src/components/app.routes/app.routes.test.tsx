import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AppRoutes } from './app.routes';

describe('Given AppRoutes component', () => {
  describe('When we navigate to List page', () => {
    const MockedHomeComponent = jest.fn().mockReturnValue(<h1>Home</h1>);
    jest.mock('../list/list', () => MockedHomeComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>,
        );
      });
      element = screen.getByText('Home');
    });
    test('Then the component should been called', () => {
      expect(MockedHomeComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Login page', () => {
    const MockedLoginComponent = jest.fn().mockReturnValue(<h1>Login</h1>);
    jest.mock('../login/login', () => MockedLoginComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/login']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>,
        );
      });
      element = screen.getByText('Login');
    });
    test('Then the component should been called', () => {
      expect(MockedLoginComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Register page', () => {
    const MockedRegisterComponent = jest
      .fn()
      .mockReturnValue(<h1>Register</h1>);
    jest.mock('../register/register', () => MockedRegisterComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/register']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>,
        );
      });
      element = screen.getByText('Register');
    });
    test('Then the component should been called', () => {
      expect(MockedRegisterComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Register page', () => {
    const MockedErrorComponent = jest.fn().mockReturnValue(<h1>Error</h1>);
    jest.mock('../error/error', () => MockedErrorComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/*']} initialIndex={0}>
            <AppRoutes></AppRoutes>
          </MemoryRouter>,
        );
      });
      element = screen.getByText('Error');
    });
    test('Then the component should been called', () => {
      expect(MockedErrorComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
