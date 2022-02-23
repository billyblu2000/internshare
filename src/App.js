import './App.css';
import server from './server';

function App() {
  server('/test/', 'get', null, null)
  return (
    <div className="App">
    </div>
  );
}

export default App;
