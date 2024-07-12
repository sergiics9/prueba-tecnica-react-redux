import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Define la carga perezosa de las rutas
const List = lazy(() => import('../list/list'));
const Login = lazy(() => import('../login/login'));
const Error = lazy(() => import('../error/error'));
const Register = lazy(() => import('../register/register'));

// Define las rutas de la aplicación

export function AppRoutes() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<List></List>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/*" element={<Error></Error>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
