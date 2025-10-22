import { useState, useEffect } from "react";
import axios from "axios";
import PieGraph from "../components/PieGraph";
import LineChartCard from "../components/LineChart";
import MoistureTable from "../components/MoistureTable";
import Card from "../components/Card";
import { SOIL_MOISTURES } from "../constants/api";
import type { SoilMoisture } from "../constants/type";

export default function Weather() {
  const [soilMoisture, setSoilMoisture] = useState<SoilMoisture[]>([]);
  const [currentInterval, setCurrentInterval] = useState("6時間");
  const intervals = [
    ["6時間", "12時間"],
    ["24時間", "48時間"],
  ];

  useEffect(() => {
    axios.get(SOIL_MOISTURES)
      .then(response => setSoilMoisture(response.data))
      .catch(console.error);
  }, []);

  if (!(soilMoisture && soilMoisture.length > 0)) {
    return <></>;
  }

  return (
      <div className="flex-[5] flex flex-col gap-10 h-full">
        <div className="flex gap-10 h-[200px]">
          <div className="w-[200px]">
            <PieGraph latest={soilMoisture[0]} />
          </div>
          <div className="w-[200px]">
            {/* @TODO:コンポーネント化
            @TODO:ラベルにする
            @TODO:色を青に統一する */}
         <Card>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-lg font-semibold">計測間隔</h3>
            <p className="text-sm text-white/50">
              現在の間隔は「{currentInterval}」に設定されています。
            </p>
          </div>
          {intervals.map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((label) => {
                const isActive = currentInterval === label;
                return (
                  <button
                    key={label}
                    onClick={() => setCurrentInterval(label)}
                    className={`flex-1 rounded-lg border p-2 text-sm transition-all
                      ${
                        isActive
                          ? "bg-green-500 hover:bg-green-400 border-green-400"
                          : "bg-white/10 hover:bg-white/20 border-white/10"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </Card>
          </div>
          <div className="flex-1">
            <LineChartCard soilMoisture={soilMoisture} />
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <MoistureTable soilMoisture={soilMoisture} />
        </div>
      </div>
  );
}
