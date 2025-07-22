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

const mockData: { time: string; moisture: string; dryness: DrynessLevel }[] = [
  { time: "2025/07/13 00:00", moisture: "70%", dryness: "しっとり" },
  { time: "2025/07/14 00:00", moisture: "68%", dryness: "しっとり" },
  { time: "2025/07/16 00:00", moisture: "60%", dryness: "ちょいカラ" },
  { time: "2025/07/17 00:00", moisture: "55%", dryness: "カラカラ" },
];

const COLORS = ["white", "#ffffff40"];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

const StyleInjector = () => {
  const style = `
@layer utilities {
@keyframes shine-once {
  0% {
    background-position: -200% 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    background-position: 200% 0;
    opacity: 0;
  }
}
  @keyframes shake {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(-15deg); }
    40% { transform: rotate(15deg); }
    60% { transform: rotate(-10deg); }
    80% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes bar-grow {
    from { width: 0; }
    to { width: var(--bar-width); }
  }
  @keyframes bar-shrink-grow {
    from { width: 0; }
    to { width: var(--bar-width); }
  }
  .animate-shake-once {
    animation: shake 0.6s ease-in-out forwards;
  }
  .bar-animate-initial {
    animation: bar-grow 0.8s ease forwards;
  }
  .bar-animate-hover {
    animation: bar-shrink-grow 0.8s ease forwards;
  }
  .bell-icon:active {
    animation: bounce-click 0.4s ease forwards;
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
      ].map((item) => (
        <li
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

const PieCard = ({
  moisture,
  dryness,
}: {
  moisture: number;
  dryness: DrynessLevel;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // アニメーション全体時間(ms)
    const incrementTime = 15; // 更新間隔(ms)
    const steps = duration / incrementTime;
    const increment = moisture / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= moisture) {
        start = moisture;
        clearInterval(interval);
      }
      setDisplayValue(Math.round(start));
    }, incrementTime);

    return () => clearInterval(interval);
  }, [moisture]);

  const pieData = [
    { name: "水分", value: moisture },
    { name: "乾燥", value: 100 - moisture },
  ];

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5 w-[200px] h-[200px]">
      <div className=" w-[160px] h-[160px] ">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={75}
              dataKey="value"
              startAngle={90.5}
              endAngle={-269.5}
              stroke="none"
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            >
              {pieData.map((entry, index) => (
                <Cell fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* @TODO:アニメーションを同時に
        @TODO:境目を円状に */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-varela">{displayValue}%</span>
          <span
            className={`px-3 py-1 text-sm rounded-full ${drynessLabels[dryness]}`}
          >
            {dryness}
          </span>
        </div>
      </div>
    </div>
  );
};

const LineChartCard = ({ data }: { data: { date: string; moisture: number }[] }) => (
  // 75%が表示されない
  <div className="flex-1 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5">
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid stroke="#ffffff40" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          stroke="white"
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(tick: number) => `${tick}%`}
          stroke="white"
          tickLine={false}
        />
        {/* <Tooltip
        // formatter={(value: number) => `${value}%`}
        // この部分の表示をいいかんじにして
        // labelFormatter={(value: number) => `${value}%`}
        /> */}
        <Line
          type="monotone"
          dataKey="moisture"
          stroke="white"
          strokeWidth={3}
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// テーブル
const MoistureTable = ({ data }: { data: typeof mockData }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // 初期表示時にバーをアニメーションさせるためフラグ管理
  const [initAnimated, setInitAnimated] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setInitAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-5 m-5 h-full">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/30">
            <th className="p-3">受信日時</th>
            <th className="p-3">土壌水分量</th>
            <th className="p-3">
              カラカラ指数
              <HelpOutlineIcon className="ml-2 p-0.5" />
              {/* <div className="absolute left-0 top-full mt-1 w-64 p-3 text-xs text-white bg-black bg-opacity-80 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                <p>しっとり: 水分量が十分で健康的です。</p>
                <p>ちょいカラ: 少し乾燥しています。注意が必要です。</p>
                <p>カラカラ: 非常に乾燥しています。早急な対策が必要です。</p>
              </div> */}
            </th>
            <th className="p-3">アラート</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const moistureValue = parseInt(row.moisture.replace("%", ""));
            // 複数行がホバーの時に反応してしまう
            return (
              <tr
                key={i}
                className="border-t border-white/20 duration-300 ease-in-out hover:bg-white/20 hover:scale-[1.01]"
                onMouseEnter={() => {
                  setHoveredRow(i);
                  setHoveredBarIndex(i);
                }}
                onMouseLeave={() => {
                  setHoveredRow(null);
                  setHoveredBarIndex(null);
                }}
              >
                <td className="p-3 font-varela">{row.time}</td>
                <td className="p-3">
                  <div className="flex items-center gap-5 font-varela">
                    <span>{row.moisture}</span>
                    <div
                      className="bar-container"
                      style={{ "--bar-width": `${moistureValue}%` } as React.CSSProperties}
                    >
                      <div className="bar-container">
                        <div
                          className={
                            "bar-fill" +
                            (initAnimated && hoveredBarIndex === null ? " bar-animate-initial" : "") +
                            (hoveredBarIndex === i ? " bar-animate-hover" : "")
                          }
                          style={{ width: `${moistureValue}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${drynessLabels[row.dryness]}`}
                  >
                    {row.dryness}
                  </span>
                </td>
                {/* @TODO:アラートが初期で揺れるようにして */}
                <td className="p-3">
                  <BellIcon
                    className={`w-5 h-5 bell-icon ${hoveredRow === i ? "animate-shake-once" : "bell-icon-fadeout"}`}
                    onClick={(e) => {
                      const el = e.currentTarget as unknown as HTMLElement;
                      el.classList.remove("animate-shake-once");
                      void el.offsetWidth;
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
  const latest = mockData[mockData.length - 1];
  const currentMoisture = Number(latest.moisture.replace("%", ""));
  const chartData = mockData.map(({ time, moisture }) => ({
    date: time,
    moisture: Number(moisture.replace("%", "")),
  }));

  return (
    <div
      className="font-kiwi text-white flex h-screen bg-center p-5"
      style={{ backgroundImage: "url(/background.png)" }}
    >
      <StyleInjector />
      <Sidebar />
      <main className="flex flex-col w-full h-full">
        <div className="flex">
          <PieCard moisture={currentMoisture} dryness={latest.dryness} />
          <LineChartCard data={chartData} />
        </div>
        <MoistureTable data={mockData} />
      </main>
    </div>
  );
}
