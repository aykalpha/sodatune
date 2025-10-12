import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "./Card";

const formatDate = (measured_at: string) => {
  const date = new Date(measured_at);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

type LineChartCardProps = {
  data: { measured_at: string; moisture: number }[];
};

export default function LineChartCard({ data }: LineChartCardProps) {
  return (
    <Card>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
