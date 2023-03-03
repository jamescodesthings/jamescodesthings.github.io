import './App.pcss';
import { Suspense, useContext, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Theme, ThemeContext } from './context/ThemeContext';
import Root from './routes/Root';

const router = createBrowserRouter(createRoutesFromElements(Root));

function App() {
  const { state } = useContext(ThemeContext);

  const isDark = state === Theme.Dark;
  useEffect(() => {
    if (isDark) {
      document.body.className = Theme.Dark;
    } else {
      document.body.className = Theme.Light;
    }
  }, [state]);

  return (
    <Suspense fallback={<>...</>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
