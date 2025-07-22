import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link
} from 'react-router-dom';

import Information from './pages/Information';
import Login from './pages/Login';
import SoilMoisture from './pages/SoilMoisture';
import Irrigation from './pages/Irrigation';

function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Information />} />
          <Route path="/soil-moisture" element={<SoilMoisture />} />
          <Route path="/irrigation" element={<Irrigation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
