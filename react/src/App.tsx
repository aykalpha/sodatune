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
    <div>
      <header>
        <h1>そだちゅーん</h1>
        <nav>
          <Link to="/">お知らせ</Link>
          <Link to="/soil-moisture">土壌水分量</Link>
          <Link to="/irrigation">灌漑</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
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
