import { useState } from "react";
import BellIcon from "@mui/icons-material/Notifications";
import AnimatedIcon from "./AnimatedIcon";
import KarakaraLabel from "./KarakaraLabel";
import MoistureCell from "./MoistureCell";
import TableContainer from "./TableContainer";

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

  return (
    <TableContainer headers={["測定日時", "土壌水分量", "カラカラ指数", "アラート"]}>
      {data.map((row, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <tr
            key={i}
            className="border-b border-white/20 hover:bg-white/20 h-10"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <td>{row.measured_at}</td>
            <td>
              <MoistureCell moisture={row.moisture} isHovered={isHovered} />
            </td>
            <td>
              <KarakaraLabel karakara_id={row.karakara_id} isHovered={isHovered} />
            </td>
            <td>
              <AnimatedIcon Icon={BellIcon} isHovered={isHovered} />
            </td>
          </tr>
        );
      })}
    </TableContainer>
  );
}
