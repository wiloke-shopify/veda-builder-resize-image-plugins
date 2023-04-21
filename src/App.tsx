import { useAtom } from 'jotai';
import { MainPage } from './pages/MainPage';
import { StarterPage } from './pages/StarterPage';
import { appState } from './storage/AppState';
import './styles.css';

function App() {
  const [{ images }] = useAtom(appState);

  const renderContent = () => {
    if (!images.length) {
      return <StarterPage />;
    }
    return <MainPage />;
  };

  return <div id="veda-builder-resize-image-plugins">{renderContent()}</div>;
}

export default App;
