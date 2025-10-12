import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import SoilMoisture from './pages/SoilMoisture';
import Irrigation from './pages/Irrigation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SoilMoisture />} />
          <Route path="/irrigation" element={<Irrigation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
