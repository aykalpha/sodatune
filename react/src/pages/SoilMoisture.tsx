import { useState, useEffect } from "react";
import axios from "axios";
import PieGraph from "../components/PieGraph";
import LineChartCard from "../components/LineChart";
import MoistureTable from "../components/MoistureTable";
import { SOIL_MOISTURES } from "../constants/api";
import type { SoilMoisture } from "../constants/type";

export default function SoilMoisture() {
  const [soilMoisture, setSoilMoisture] = useState<SoilMoisture[]>([]);

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
