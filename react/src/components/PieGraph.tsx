import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "./Card";
import KarakaraLabel from "./KarakaraLabel";

type PieGraphProps = {
  moisture: number;
  karakara_id: number;
};

export default function PieGraph({ moisture, karakara_id }: PieGraphProps) {
  const [displayMoisture, setDisplayMoisture] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let start = 0;
    const intervalTime = 15;
    const step = Math.round(moisture / (500 / intervalTime));
    const interval = setInterval(() => {
      start += step;
      setDisplayMoisture(start >= moisture ? moisture : start);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [moisture]);

  const pieData = [
    { color: "white", value: displayMoisture },
    { color: "rgba(255,255,255,0.2)", value: 100 - displayMoisture },
  ];

  return (
    <Card>
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
            isAnimationActive={true}
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        {/* 数値 */}
        <span className="text-3xl font-bold font-varela">{displayMoisture}%</span>

        {/* カラカラ指数 */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <KarakaraLabel karakara_id={karakara_id} isHovered={isHovered} />
        </div>
      </div>
    </Card>
  );
}
