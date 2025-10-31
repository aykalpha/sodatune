import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SoilMoisture from "./pages/SoilMoisture";
import Irrigation from "./pages/Irrigation";
import Weather from "./pages/Weather";
import Journal from "./pages/Journal";
import Manager from "./pages/Manager";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/user-info", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

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
