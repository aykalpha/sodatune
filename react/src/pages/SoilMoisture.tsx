import { useState, useEffect } from "react";
import axios from "axios";
import PieGraph from "../components/PieGraph";
import LineChartCard from "../components/LineChart";
import MoistureTable from "../components/MoistureTable";
import { SOIL_MOISTURES } from "../constants/api";

type SoilMoisture = {
  measured_at: string;
  moisture: number;
  karakara_id: number;
};

export default function SoilMoisture() {
  const [soilMoisture, setSoilMoisture] = useState<SoilMoisture[]>([]);

  useEffect(() => {
    axios.get(SOIL_MOISTURES)
      .then(response => setSoilMoisture(response.data as SoilMoisture[]))
      .catch(console.error);
  }, []);

  if (!(soilMoisture && soilMoisture.length > 0)) {
    return <></>;
  }

  const latest = soilMoisture[soilMoisture.length - 1];

  return (
      <div className="flex-[5] flex flex-col gap-10 h-full">
        <div className="flex gap-10 h-[200px]">
          <div className="w-[200px]">
            <PieGraph moisture={latest.moisture} karakara_id={latest.karakara_id} />
          </div>
          <div className="flex-1">
            <LineChartCard data={soilMoisture} />
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <MoistureTable data={soilMoisture} />
        </div>
      </div>
  );
}
