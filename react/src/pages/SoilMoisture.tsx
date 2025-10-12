import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PieGraph from "../components/PieGraph";
import LineChartCard from "../components/LineChart";
import MoistureTable from "../components/MoistureTable";

type SoilMoistureData = {
  measured_at: string;
  moisture: number;
  karakara_id: number;
};

export default function SoilMoisture() {
  const [data, setData] = useState<SoilMoistureData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/soil-moistures")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if(!(data && data.length > 0)){
    return <></>;
  }
  const latest = data[data.length - 1];

  return (
    <div
      className="font-kiwi text-white bg-center bg-cover flex h-screen gap-5 p-5"
      style={{ backgroundImage: "url(/background.png)" }}
    >
      <div className="flex-[1]">
        <Sidebar />
      </div>

      <div className="flex-[5] flex flex-col gap-5 h-full">
        <div className="flex gap-5 h-[200px]">
          <div className="w-[200px]">
            <PieGraph moisture={latest.moisture} karakara_id={latest.karakara_id} />
          </div>
          <div className="flex-1">
            <LineChartCard data={data} />
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <MoistureTable data={data} />
        </div>
      </div>
    </div>
  );
}
