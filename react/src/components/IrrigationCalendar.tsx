import { useEffect, useState } from "react";
import axios from "axios";
import { IRRIGATIONS } from "../constants/api";
import Card from "./Card";

interface Irrigation {
  irrigated_at: string;
  user_id: number;
}

const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const getMonthTitle = (y: number, m: number) => `${y}年 ${m + 1}月`;

export default function IrrigationCalendar() {
  const [irrigations, setIrrigations] = useState<Irrigation[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    axios.get(IRRIGATIONS)
      .then(response => setIrrigations(response.data as Irrigation[]))
      .catch(console.error);
  }, []);

  // 最新4ヶ月を取得
  const now = new Date();
  const months = [...Array(4)].map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 3 + i);
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const renderCalendar = (y: number, m: number) => {
    const irrigationMap = irrigations
      .filter((i) => {
        const d = new Date(i.irrigated_at);
        return d.getFullYear() === y && d.getMonth() === m;
      })
      .reduce((map, i) => {
        const day = new Date(i.irrigated_at).getDate();
        (map[day] ||= []).push(i);
        return map;
      }, {} as Record<number, Irrigation[]>);

    return (
      <div key={`${y}-${m}`} className="flex flex-col bg-white/10 border border-white/20 rounded-3xl p-4 shadow-xl">
        <h3 className="text-center font-semibold border-b border-white/50 mb-2 pb-2">
          {getMonthTitle(y, m)}
        </h3>
        <div className="grid gap-1 p-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {[...Array(getDaysInMonth(y, m))].map((_, i) => {
            const d = i + 1;
            const irrigated = !!irrigationMap[d];
            const isHovered = hovered === `${y}-${m}-${d}`;

            return (
              <div
                key={d}
                onMouseEnter={() => setHovered(`${y}-${m}-${d}`)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center justify-center aspect-square rounded-full text-sm cursor-default
                ${ irrigated
                    ? isHovered
                      ? "bg-cyan-400/70"
                      : "bg-cyan-500/30"
                    : "text-white border border-white/30 hover:bg-white/50 hover:text-white"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {months.map(({ y, m }) => renderCalendar(y, m))}
      </div>
    </Card>
  );
}
