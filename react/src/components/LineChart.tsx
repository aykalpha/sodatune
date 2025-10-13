import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "./Card";
import type { SoilMoisture } from "../constants/type";

type LineChartCardProps = {
  soilMoisture: SoilMoisture[];
};

export default function LineChartCard({ soilMoisture }: LineChartCardProps) {

  const formatDate = (measured_at: string) => {
    const date = new Date(measured_at);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={soilMoisture.slice(-12)} margin={{ top: 10, right: 25, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.2)" />
          <XAxis
            dataKey="measured_at"
            tickFormatter={formatDate}
            stroke="white"
            tickLine={false}
            height={20}
            tickMargin={5}
            tick={{ fontSize: 14 }}
          />
          <YAxis
           domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(tick) => `${tick}%`}
            stroke="white"
            tickLine={false}
            width={45}
            tickMargin={5}
            tick={{ fontSize: 14 }}
          />
          <Tooltip
            cursor={{ stroke: "white", strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (active && payload) {
                return (
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "5px 10px",
                      borderRadius: 10,
                      color: "white",
                    }}
                  >
                    {`${payload[0].value}%`}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="white"
            strokeWidth={3}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
