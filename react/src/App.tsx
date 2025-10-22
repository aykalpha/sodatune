import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SoilMoisture from "./pages/SoilMoisture";
import Irrigation from "./pages/Irrigation";
import Weather from "./pages/Weather";
import Journal from "./pages/Journal";
import Manager from "./pages/Manager";

function App() {
  return (
    <BrowserRouter>
      {/* 全ページ共通のレイアウト */}
      <div className="font-kiwi text-white bg-center bg-cover flex h-screen gap-10 pt-10 pb-10 pl-10">
        {/* 左：サイドバー（固定） */}
        <div className="flex-[1]">
          <Sidebar />
        </div>

        {/* 右：ページごとのメイン部分 */}
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
    </BrowserRouter>
  );
}

export default App;
