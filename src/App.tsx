import './App.pcss';
import { Suspense, useContext, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Theme, ThemeContext } from './context/ThemeContext';
import Root from './routes/Root';

const router = createBrowserRouter(createRoutesFromElements(Root));

function setDarkMode() {
  if (!document.body.classList.contains(Theme.Dark)) document.body.classList.add(Theme.Dark);
  if (document.body.classList.contains(Theme.Light)) document.body.classList.remove(Theme.Light);
}

function setLightMode() {
  if (!document.body.classList.contains(Theme.Light)) document.body.classList.add(Theme.Light);
  if (document.body.classList.contains(Theme.Dark)) document.body.classList.remove(Theme.Dark);
}

function App() {
  const { state } = useContext(ThemeContext);

  const isDark = state === Theme.Dark;
  useEffect(() => {
    if (isDark) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [isDark]);

  return (
    <Suspense fallback={<>...</>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
