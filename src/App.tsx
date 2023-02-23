import './App.pcss';
import { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Root from './routes/Root';

const router = createBrowserRouter(createRoutesFromElements(Root));

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<>...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
