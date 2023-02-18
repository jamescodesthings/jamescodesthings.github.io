import './App.pcss';
import { ThemeProvider } from './context/ThemeContext';
import { PageHome } from './pages/PageHome';

function App() {
  return (
    <ThemeProvider>
      <PageHome />
    </ThemeProvider>
  );
}

export default App;
