import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ←追加！
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import Card from "./Card";
import AnimatedIcon from "./AnimatedIcon";
import Logo from "./Logo";

export default function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { icon: WaterDropIcon, label: "土壌水分量", path: "/" },
    { icon: OpacityIcon, label: "潅水", path: "/irrigation" },
  ];

  return (
    <Card>
      <Logo />
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`
              flex gap-4 px-2 py-2 mt-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => navigate(item.path)}
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
