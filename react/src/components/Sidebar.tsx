// OK
import { useState } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import Card from "./Card";
import AnimatedIcon from "./AnimatedIcon";

export default function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { icon: WaterDropIcon, label: "土壌水分量" },
    { icon: OpacityIcon, label: "潅水" },
  ];

  return (
    <Card>
      <img src="/logo.png" className="drop-shadow p-4" />

      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`
              flex gap-4 px-2 py-2 mt-2 rounded-xl hover:bg-white/20 transition-colors
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatedIcon
              Icon={item.icon}
              isHovered={hoveredIndex === index}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
