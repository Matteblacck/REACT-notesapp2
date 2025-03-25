import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';
import MainPage from './components/pages/MainPage/MainPage.tsx';
import NotePage from './components/pages/NotePage/NotePage.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <MainPage /> },  // Исправлен синтаксис здесь
        { path: '/note/:id', element:<NotePage/>}
      ]
    }
  ],
  {basename: '/notes2'}
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />  {/* Используем RouterProvider с переданным router */}
  </StrictMode>
);