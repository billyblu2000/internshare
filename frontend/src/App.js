import { useRoutes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import routes from './routes';

function App() {
  const elements = useRoutes(routes);
  AOS.init({
    duration: 400,
    easing: 'ease-in-out-back',
  });
  return (
    <div className="App">
      {elements}
    </div>
  );
}

export default App;
