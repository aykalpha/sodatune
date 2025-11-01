import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SoilMoisture from "./pages/SoilMoisture";
import Irrigation from "./pages/Irrigation";
import Weather from "./pages/Weather";
import Journal from "./pages/Journal";
import Manager from "./pages/Manager";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useUser } from "./hooks/useUser";

function App() {
  const { user, setUser, getUser } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route
            path="/*"
            element={
              <div className="font-kiwi text-white bg-center bg-cover flex h-screen gap-10 pt-10 pb-10 pl-10">
                <div className="flex-[1]">
                  <Sidebar user={user} />
                </div>
                <div className="flex-[5] flex flex-col gap-10 h-full overflow-hidden pr-10">
                  <Routes>
                    <Route path="/" element={<SoilMoisture />} />
                    <Route path="/irrigation" element={<Irrigation />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/manager" element={<Manager />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
