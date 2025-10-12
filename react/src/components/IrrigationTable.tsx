import { useEffect, useState } from "react";
import axios from "axios";
import { IRRIGATIONS } from "../constants/api";
import TableContainer from "./TableContainer";

interface Irrigation {
  id: number;
  irrigated_at: string;
  user_id: number;
}

export default function IrrigationTable() {
  const [irrigations, setIrrigations] = useState<Irrigation[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(IRRIGATIONS);
        setIrrigations(response.data as Irrigation[]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <TableContainer
      headers={["潅水日時", "ユーザーID",]}
    >
      {irrigations.map((row, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <tr
            key={row.id}
            className={`border-b border-white/20 h-10 ${
              isHovered ? "bg-white/20" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <td>{row.irrigated_at}</td>
          </tr>
        );
      })}
    </TableContainer>
  );
}
