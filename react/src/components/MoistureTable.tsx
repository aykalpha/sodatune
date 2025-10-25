import { useState } from "react";
import BellIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AnimatedIcon from "./AnimatedIcon";
import KarakaraLabel from "./KarakaraLabel";
import MoistureCell from "./MoistureCell";
import TableContainer from "./TableContainer";
import type { SoilMoisture } from "../constants/type";
import { KarakaraList } from "../constants/constants";
import { Tooltip } from "@mui/material";
import Card from "./Card";

type MoistureTableProps = {
  soilMoisture: SoilMoisture[];
};

export default function MoistureTable({ soilMoisture }: MoistureTableProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // カラカラ指数の説明リスト
  const karakaraDescription = (
    <Card>
        {KarakaraList.map((k) => (
          <div key={k.id} className="flex items-center gap-4 mb-2">
            <KarakaraLabel karakara_id={k.id} isHovered={false} />
            <span className="text-sm">{k.descriptions}</span>
          </div>
        ))}

    </Card>
  );

  const headers = [
    "測定日時",
    "土壌水分量",
    <div key="karakara" className="flex items-center gap-1">
      <span>カラカラ指数</span>
        <Tooltip
          title={karakaraDescription}
          placement="top"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "transparent",
                fontSize: "inherit",
                maxWidth: "none",
              },
            }
          }}
        >
        <HelpOutlineIcon
          className="m-1"
          fontSize="small"
        />
      </Tooltip>
    </div>,
    "アラート",
  ];

  return (
    <TableContainer headers={headers}>
      {soilMoisture.map((row, i) => {
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
              <div className={row.notified ? "" : "opacity-10"}>
                <AnimatedIcon Icon={BellIcon} isHovered={isHovered} />
              </div>
            </td>
          </tr>
        );
      })}
    </TableContainer>
  );
}
