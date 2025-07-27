import React, { useState, useEffect } from "react";
import { BellIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const drynessLabels = {
  しっとり: "bg-sky-500/30 text-white border border-sky-500",
  ちょいカラ: "bg-yellow-500/30 text-white border border-yellow-500",
  カラカラ: "bg-red-500/30 text-white border border-red-500",
} as const;
type DrynessLevel = keyof typeof drynessLabels;

const COLORS = ["white", "#ffffff40"];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const StyleInjector = () => {
  const style = `
  @layer utilities {
    @keyframes shake {
      0% { transform: rotate(0deg); }
      20% { transform: rotate(-15deg); }
      40% { transform: rotate(15deg); }
      60% { transform: rotate(-10deg); }
      80% { transform: rotate(10deg); }
      100% { transform: rotate(0deg); }
    }
    .animate-shake-once {
      animation: shake 0.6s ease-in-out forwards;
    }
    .bar-container {
      width: 100px;
      height: 10px;
      background-color: rgba(255 255 255 / 0.2);
      border-radius: 9999px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      background-color: white;
      border-radius: 9999px;
    }
    .bar-animate-initial {
      animation: bar-grow 1s ease forwards;
    }
    .bar-animate-hover {
      animation: bar-shrink-grow 0.3s ease forwards;
    }
  }
  `;
  return <style dangerouslySetInnerHTML={{ __html: style }} />;
};

const Sidebar = () => (
  <aside className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5 w-[20%] flex flex-col">
    <img src="/logo.png" className="w-full drop-shadow-lg" />
    <ul className="space-y-4 text-lg">
      {[
        { icon: <WaterDropIcon />, label: "土壌水分量" },
        { icon: <OpacityIcon />, label: "潅水" },
      ].map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20"
        >
          {item.icon}
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
    <button className="mt-auto bg-white/10 hover:bg-white/20 py-3 rounded-full border border-white/20">
      ログアウト
    </button>
  </aside>
);

// ここでAPIの karakara_id に対応する名前をマッピング（IDはDBの実際のものに合わせてください）
const karakaraMap: Record<number, DrynessLevel> = {
  1: "カラカラ",
  2: "ちょいカラ",
  3: "しっとり",
};

// 型定義
type SoilMoistureDataRaw = {
  measured_at: string;
  moisture: number | string;
  karakara_id: number;
};

type SoilMoistureData = {
  measured_at: string;
  moisture: number;
  dryness: DrynessLevel;
};

const PieCard = ({ moisture, dryness }: { moisture: number; dryness: DrynessLevel }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const interval = setInterval(() => {
      start += moisture / (duration / 15);
      if (start >= moisture) {
        setDisplayValue(moisture);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, 15);
    return () => clearInterval(interval);
  }, [moisture]);

  const pieData = [
    { name: "水分", value: moisture },
    { name: "乾燥", value: 100 - moisture },
  ];

  return (
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5 w-[200px] h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            innerRadius={60}
            outerRadius={75}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-varela">{displayValue}%</span>
        <span className={`px-3 py-1 text-sm rounded-full ${drynessLabels[dryness]}`}>
          {dryness}
        </span>
      </div>
    </div>
  );
};

const LineChartCard = ({ data }: { data: { date: string; moisture: number }[] }) => (
  <div className="flex-1 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5">
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid stroke="#ffffff40" />
        <XAxis dataKey="date" tickFormatter={formatDate} stroke="white" tickLine={false} />
        <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} stroke="white" tickLine={false} />
        <Tooltip formatter={(value: number) => `${value}%`} />
        <Line type="monotone" dataKey="moisture" stroke="white" strokeWidth={3} isAnimationActive />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const MoistureTable = ({ data }: { data: SoilMoistureData[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [initAnimated, setInitAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInitAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5 h-full overflow-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/30">
            <th className="p-3">受信日時</th>
            <th className="p-3">土壌水分量</th>
            <th className="p-3">
              カラカラ指数 <HelpOutlineIcon className="ml-2 p-0.5" />
            </th>
            <th className="p-3">アラート</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const moistureValue = row.moisture; // 数値のまま
            return (
              <tr
                key={i}
                className="border-t border-white/20 hover:bg-white/20 hover:scale-[1.01] transition-transform"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <td className="p-3 font-varela">{row.measured_at}</td>
                <td className="p-3">
                  <div className="flex items-center gap-5 font-varela">
                    <span>{moistureValue}%</span>
                    <div
                      className="bar-container"
                      style={{ "--bar-width": `${moistureValue}%` } as React.CSSProperties}
                    >
                      <div
                        className={
                          "bar-fill" +
                          (initAnimated && hoveredIndex === null ? " bar-animate-initial" : "") +
                          (hoveredIndex === i ? " bar-animate-hover" : "")
                        }
                        style={{ width: `${moistureValue}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 text-sm rounded-full ${drynessLabels[row.dryness]}`}>
                    {row.dryness}
                  </span>
                </td>
                <td className="p-3">
                  <BellIcon
                    className={`w-5 h-5 bell-icon ${hoveredIndex === i ? "animate-shake-once" : ""}`}
                    onClick={(e) => {
                      const el = e.currentTarget as unknown as HTMLElement;
                      el.classList.remove("animate-shake-once");
                      void el.offsetWidth; // 再描画を強制してアニメーションをリトリガー
                      el.classList.add("animate-shake-once");
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function SoilMoisture() {
  const [data, setData] = useState<SoilMoistureData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/soil-moistures")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json: SoilMoistureDataRaw[]) => {
        // karakara_idをdrynessラベルに変換してdataセット
        const formatted = json.map((item) => ({
          measured_at: item.measured_at,
          moisture: typeof item.moisture === "string" ? parseInt(item.moisture.replace("%", ""), 10) : item.moisture,
          dryness: karakaraMap[item.karakara_id] ?? "しっとり",
        }));
        setData(formatted);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white p-5">読み込み中...</div>;
  if (error) return <div className="text-red-500 p-5">データ取得エラー: {error}</div>;
  if (data.length === 0) return <div className="text-white p-5">データがありません</div>;

  const latest = data[data.length - 1];
  const currentMoisture = latest.moisture;

  const chartData = data.map(({ measured_at, moisture }) => ({
    date: measured_at,
    moisture,
  }));

  return (
    <div
      className="font-kiwi text-white flex h-screen bg-center p-5"
      style={{ backgroundImage: "url(/background.png)" }}
    >
      <StyleInjector />
      <Sidebar />
      <main className="flex flex-col w-full h-full">
        <div className="flex flex-wrap">
          <PieCard moisture={currentMoisture} dryness={latest.dryness} />
          <LineChartCard data={chartData} />
        </div>
        <MoistureTable data={data} />
      </main>
    </div>
  );
}
