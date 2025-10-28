import { useEffect, useState } from "react";
import axios from "axios";
import { IRRIGATIONS } from "../constants/api";
import Card from "./Card";

interface Irrigation {
  irrigated_at: string;
  user_id: number;
}

export default function JournalCalendar() {
  const [irrigations, setIrrigations] = useState<Irrigation[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    axios.get(IRRIGATIONS)
      .then(res => setIrrigations(res.data))
      .catch(console.error);
  }, []);

  const now = new Date();
  const months = Array.from({ length: 1 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 3 + i);
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const renderCalendar = (y: number, m: number) => {
    const days = new Date(y, m + 1, 0).getDate();
    const title = `${y}年 ${m + 1}月`;

    const irrigationMap: Record<number, Irrigation[]> = {};
    irrigations.forEach((i) => {
      const d = new Date(i.irrigated_at);
      if (d.getFullYear() === y && d.getMonth() === m) {
        const day = d.getDate();
        (irrigationMap[day] ||= []).push(i);
      }
    });

    return (
      <Card>
        <h3 className="text-center font-semibold border-b border-white/50 mb-2 pb-2">{title}</h3>
        <div className="grid gap-2 p-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {Array.from({ length: days }, (_, i) => {
            const d = i + 1;
            const id = `${y}-${m}-${d}`;
            const irrigated = irrigationMap[d];
            const hoveredDay = hovered === id;

            return (
              <div
                key={d}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className={[
                  "flex items-center justify-center aspect-square rounded-full text-sm cursor-default transition-colors",
                  irrigated
                    ? hoveredDay
                      ? "bg-cyan-400"
                      : "bg-cyan-500"
                    : "text-white border border-white/50 hover:bg-white/20",
                ].join(" ")}
              >
                {d}
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full">
      {months.map(({ y, m }) => renderCalendar(y, m))}
    </div>
  );
}
