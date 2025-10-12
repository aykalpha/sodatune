import { useState } from "react";
import BellIcon from "@mui/icons-material/Notifications";
import Card from "./Card";
import KarakaraLabel from "./KarakaraLabel";
import AnimatedIcon from "./AnimatedIcon";
import MoistureCell from "./MoistureCell";
import { Scrollbars } from "react-custom-scrollbars-2";

export type SoilMoistureData = {
  measured_at: string;
  moisture: number;
  karakara_id: number;
};

type MoistureTableProps = {
  data: SoilMoistureData[];
};

export default function MoistureTable({ data }: MoistureTableProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderThumb = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: "white",
      borderRadius: "15px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderTrack = ({ style, ...props }: any) => {
    const trackStyle = {
      right: 0,
      bottom: 0,
      top: 0,
      width:"15px",
      borderRadius: "15px",
      backgroundColor: "rgba(255,255,255,0.2)",
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  return (
    <Card>
      <div className="h-full flex flex-col">
        {/* ヘッダー */}
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b border-white/20 h-10">
              <th>測定日時</th>
              <th>土壌水分量</th>
              <th>カラカラ指数</th>
              <th>アラート</th>
            </tr>
          </thead>
        </table>

        {/* テーブル */}
        <Scrollbars
          autoHide
          renderThumbVertical={renderThumb}
          renderTrackVertical={renderTrack}
        >
          <table className="w-full text-left table-fixed">
            <tbody>
              {data.map((row, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <tr
                    key={i}
                    className="border-b border-white/20 hover:bg-white/20 h-10"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <td className="font-varela">{row.measured_at}</td>
                    <td>
                      <MoistureCell moisture={row.moisture} isHovered={isHovered} />
                    </td>
                    <td>
                      <KarakaraLabel karakara_id={row.karakara_id} isHovered={isHovered}/>
                    </td>
                    <td>
                      <AnimatedIcon Icon={BellIcon} isHovered={isHovered} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </Card>
  );
}
